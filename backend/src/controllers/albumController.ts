import { Request, Response, NextFunction } from "express";
import Album from "../models/albumModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

// Create a new album
export const createAlbum = catchAsync(
  async (req, res, next) => {
    const newAlbum = await Album.create(req.body);
    res.status(201).json({
      status: "success",
      data: { newAlbum },
    });
  }
);

// List all albums
export const listAlbums = catchAsync(async (req: Request, res: Response) => {
  const albums = await Album.find().populate({
    path: "songs",
    select: "title",
  });
  res.status(200).json({
    result: albums.length,
    status: "success",
    data: { albums },
  });
});

// Get album by ID
export const getAlbumById = catchAsync(
  async (req, res, next) => {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return next(new AppError("No album found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: { album },
    });
  }
);

// Update an album
export const updateAlbum = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, songs } = req.body;
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      { name, songs },
      { new: true }
    );
    if (!updatedAlbum) {
      return next(new AppError("No album found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: { updatedAlbum },
    });
  }
);

// Delete an album
export const deleteAlbum = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return next(new AppError("No album found with that ID", 404));
    }
    await Album.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
