import { Request, Response, NextFunction } from "express";
import Artist from "../models/artistModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

// Create a new artist
export const createArtist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const newArtist = await Artist.create({ name });
    res.status(201).json({
      status: "success",
      data: { newArtist },
    });
  }
);

// List all artists
export const listArtists = catchAsync(async (req: Request, res: Response) => {
  const artists = await Artist.find();
  res.status(200).json({
    result: artists.length,
    status: "success",
    data: { artists },
  });
});

// Get artist by ID
export const getArtistById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const artist = await Artist.findById(req.params.id);
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
    const { name } = req.body;
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedArtist) {
      return next(new AppError("No artist found with that ID", 404));
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
    await Artist.findByIdAndDelete(req.params.id); // Corrected line
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
