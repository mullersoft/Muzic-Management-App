import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import Song from "../models/songModel";
import catchAsync from "../utils/catchAsync";
import {upload} from "../utils/multerConfig";
import AppError from "../utils/appError";
// Middleware to handle file upload
export const uploadFile = upload.single('fileUrl'); // Ensure field name matches
export const createSong = catchAsync(
  async (req, res, next) => {
    if (!req.file) {
        return next(new AppError("No file uploaded!", 404));
    }
    const { title, artist, album, genre } = req.body;
    const fileUrl = req.file.path; 
    // Create a new song record
    const newSong = await Song.create({
      title,
      artist,
      album,
      genre,
      fileUrl,
    });
    res.status(201).json({
      status: "success",
      data: { newSong },
    });
  }
);
export const listSongs = catchAsync(async (req: Request, res: Response) => {
  const songs = await Song.find();
  res.status(200).json({
    result: songs.length,
    status: "success",
    data: { songs },
  });
});

// Get a song by ID
export const getSongById = catchAsync(
  async (req, res, next) => {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return next(new AppError("No song found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: { song },
    });
  }
);



// Update a song
export const updateSong = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, artist, album, genre } = req.body;
    let newFileUrl = req.file?.path; // Only get the new file URL if a file is uploaded

    // Find the song to get its existing file URL
    const song = await Song.findById(req.params.id);
    if (!song) {
      return next(new AppError("No song found with that ID", 404));
    }

    // If a new file is uploaded, delete the old file
    if (newFileUrl) {
      if (song.fileUrl) {
        // Construct the correct file path for the old file
        const oldFilePath = path.resolve(
          __dirname,
          "../..",
          "uploads",
          path.basename(song.fileUrl)
        );

        // Log the file path for debugging
        console.log(`Attempting to delete old file at ${oldFilePath}`);

        // Delete the old file
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error(`Failed to delete old file ${oldFilePath}:`, err);
          } else {
            console.log(`Old file ${oldFilePath} deleted successfully.`);
          }
        });
      }
    } else {
      newFileUrl = song.fileUrl; // Keep the old file URL if no new file is uploaded
    }

    // Update the song record
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist, album, genre, fileUrl: newFileUrl },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: { updatedSong },
    });
  }
);







// Delete a song
export const deleteSong = catchAsync(
  async (req, res, next) => {
    // Find the song to get its file URL
    const song = await Song.findById(req.params.id);
    if (!song) {
      return next(new AppError("No song found with that ID", 404));
    }
    // Retrieve the file URL before deleting the song metadata
    const fileUrl = song.fileUrl;
    // Delete the song record
    await Song.findByIdAndDelete(req.params.id);
    // Delete the associated file from the server
    if (fileUrl) {
      // Construct the correct file path
      const filePath = path.resolve(
        __dirname,
        "../..",
        "uploads",
        path.basename(fileUrl)
      );

      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file ${filePath}:`, err);
        } else {
          console.log(`File ${filePath} deleted successfully.`);
        }
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);




