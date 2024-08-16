import { Request, Response, NextFunction } from "express";
import Artist from "../models/artistModel";
import Song from "../models/songModel"; // Import Song model
import Album from "../models/albumModel"; // Import Album model
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

// Create a new artist
export const createArtist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newArtist = await Artist.create(req.body);
    res.status(201).json({
      status: "success",
      data: { newArtist },
    });
  }
);

// List all artists
export const listArtists = catchAsync(async (req, res) => {
  const artists = await Artist.find()
    // .populate({
    //   path: "albums",
    //   select: "name",
    // })
    .populate({
      path: "songs",
      select: "title",
    });
  res.status(200).json({
    result: artists.length,
    status: "success",
    data: { artists },
  });
});

// Get artist by ID
export const getArtistById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const artist = await Artist.findById(req.params.id)
      // .populate({
      //   path: "albums",
      //   select: "name",
      // })
      .populate({
        path: "songs",
        select: "title",
      });;
    if (!artist) {
      return next(new AppError("No artist found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: { artist },
    });
  }
);

// Update an artist
export const updateArtist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, songs, albums } = req.body;
    // Update the artist's name
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      { name, songs, albums },
      { new: true }
    );

    if (!updatedArtist) {
      return next(new AppError("No artist found with that ID", 404));
    }

    // Update songs associated with the artist
    if (songs && songs.length > 0) {
      await Song.updateMany(
        { _id: { $in: songs } },
        { $set: { artist: req.params.id } }
      );
    }

    // Update albums associated with the artist
    if (albums && albums.length > 0) {
      await Album.updateMany(
        { _id: { $in: albums } },
        { $addToSet: { artists: req.params.id } } 
      );
    }

    res.status(200).json({
      status: "success",
      data: { updatedArtist },
    });
  }
);

// Delete an artist
export const deleteArtist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return next(new AppError("No artist found with that ID", 404));
    }
    await Artist.findByIdAndDelete(req.params.id); 
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
