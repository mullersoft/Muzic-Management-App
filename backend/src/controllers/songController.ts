import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import Song from "../models/songModel";
import Artist from "../models/artistModel";
import Album from "../models/albumModel";
import Genre from "../models/genreModel";
import catchAsync from "../utils/catchAsync";
import { upload } from "../utils/multerConfig";
import AppError from "../utils/appError";

// Middleware to handle file upload
export const uploadFile = upload.single("fileUrl"); // Ensure field name matches

export const createSong = catchAsync(
  async (req, res, next) => {
    if (!req.file) {
      return next(new AppError("No file uploaded!", 404));
    }
    const { title, artists, album, genres } = req.body;
    const fileUrl = req.file.path;

    // Create a new song record
    const newSong = await Song.create({
      title,
      artists, // Expecting an array of artist IDs
      album, // Album ID
      genres, // Expecting an array of genre IDs
      fileUrl,
    });

    // Add the song reference to the related artists and album
    await Artist.updateMany(
      { _id: { $in: artists } },
      { $push: { songs: newSong._id } }
    );
    if (album) {
      await Album.findByIdAndUpdate(album, { $push: { songs: newSong._id } });
    }
    await Genre.updateMany(
      { _id: { $in: genres } },
      { $push: { songs: newSong._id } }
    );

    res.status(201).json({
      status: "success",
      data: { newSong },
    });
  }
);



export const listSongs = catchAsync(async (req: Request, res: Response) => {
  const { title, artist, genre, album } = req.query;

  // Building the filter object
  const filter: any = {};

  if (title) {
    filter.title = { $regex: title as string, $options: "i" }; // Case-insensitive search
  }

  if (artist) {
    if (Array.isArray(artist)) {
      // If artist is an array of strings
      filter.artists = { $in: artist };
    } else if (typeof artist === "string") {
      // If artist is a single string
      const artistsArray = artist.split(","); // Split the artist string into an array
      filter.artists = { $in: artistsArray }; // Use $in to match any artist in the array
    }
  }

  if (genre) {
    if (Array.isArray(genre)) {
      // If genre is an array of strings
      filter.genres = { $in: genre };
    } else if (typeof genre === "string") {
      // If genre is a single string
      const genresArray = genre.split(","); // Split the genre string into an array
      filter.genres = { $in: genresArray }; // Use $in to match any genre in the array
    }
  }

  if (album) {
    if (Array.isArray(album)) {
      // If album is an array of strings
      filter.album = { $in: album };
    } else if (typeof album === "string") {
      // If album is a single string
      const albumsArray = album.split(","); // Split the album string into an array
      filter.album = { $in: albumsArray }; // Use $in to match any album in the array
    }
  }

  // Fetch the songs based on the filter
  const songs = await Song.find(filter)
    .populate({
      path: "artists",
      select: "name",
    })
    .populate({
      path: "genres",
      select: "name",
    })
    .populate({
      path: "album",
      select: "name",
    });

  res.status(200).json({
    result: songs.length,
    status: "success",
    data: { songs },
  });
});

// Get a song by ID
export const getSongById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const song = await Song.findById(req.params.id)
      .populate({
        path: "artists",
        select: "name", 
      })
      .populate({
        path: "genres",
        select: "name", 
      })
      .populate({
        path: "album",
        select: "name", 
      });
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
    const { title, artists, album, genres } = req.body;
    let newFileUrl = req.file?.path; // Only get the new file URL if a file is uploaded

    // Find the song to get its existing file URL
    const song = await Song.findById(req.params.id);
    if (!song) {
      return next(new AppError("No song found with that ID", 404));
    }

    // If a new file is uploaded, delete the old file
    if (newFileUrl) {
      if (song.fileUrl) {
        const oldFilePath = path.resolve(
          __dirname,
          "../..",
          "uploads",
          path.basename(song.fileUrl)
        );
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
      { title, artists, album, genres, fileUrl: newFileUrl },
      { new: true }
    )
      .populate({
        path: "artists",
        select: "name", 
      })
      .populate({
        path: "genres",
        select: "name", 
      })
      .populate({
        path: "album",
        select: "name", 
      });

    res.status(200).json({
      status: "success",
      data: { updatedSong },
    });
  }
);

// Delete a song
export const deleteSong = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Find the song to get its file URL
    const song = await Song.findById(req.params.id);
    if (!song) {
      return next(new AppError("No song found with that ID", 404));
    }

    // Retrieve the file URL before deleting the song metadata
    const fileUrl = song.fileUrl;

    // Delete the song record
    await Song.deleteOne({ _id: song._id });

    // Remove the song reference from the related artists, album, and genres
    await Artist.updateMany(
      { _id: { $in: song.artists } },
      { $pull: { songs: song._id } }
    );
    if (song.album) {
      await Album.findByIdAndUpdate(song.album, { $pull: { songs: song._id } });
    }
    await Genre.updateMany(
      { _id: { $in: song.genres } },
      { $pull: { songs: song._id } }
    );

    // Delete the associated file from the server
    if (fileUrl) {
      const filePath = path.resolve(
        __dirname,
        "../..",
        "uploads",
        path.basename(fileUrl)
      );

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
