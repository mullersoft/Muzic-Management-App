import { Request, Response, NextFunction } from "express";
import Genre from "../models/genreModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

// Create a new genre
export const createGenre = catchAsync(async (req, res, next) => {
  const newGenre = await Genre.create(req.body);
  res.status(201).json({
    status: "success",
    data: { newGenre },
  });
});


// List all genres
export const listGenres = catchAsync(async (req: Request, res: Response) => {
  const genres = await Genre.find().populate({
    path: "songs",
    select: "title",
  });

  res.status(200).json({
    result: genres.length,
    status: "success",
    data: { genres },
  });
});


// Get genre by ID
export const getGenreById = catchAsync(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).populate({
    path: "songs",
    select: "title",
  });
  if (!genre) {
    return next(new AppError("No genre found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { genre },
  });
});

// Update a genre
export const updateGenre = catchAsync(async (req, res, next) => {
  const { name, songs } = req.body;
  const updatedGenre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name, songs },
    { new: true }
  );
  if (!updatedGenre) {
    return next(new AppError("No genre found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { updatedGenre },
  });
});

// Delete a genre
export const deleteGenre = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return next(new AppError("No genre found with that ID", 404));
    }
    await Genre.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
