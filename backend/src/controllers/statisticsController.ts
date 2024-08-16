import { Request, Response, NextFunction } from "express";
import Song from "../models/songModel";
import Artist from "../models/artistModel";
import Album from "../models/albumModel";
import Genre from "../models/genreModel";
import catchAsync from "../utils/catchAsync";

export const getStatistics = catchAsync(
  async (req, res, next) => {
    // 1. Total number of songs, artists, albums, genres
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Artist.countDocuments();
    const totalAlbums = await Album.countDocuments();
    const totalGenres = await Genre.countDocuments();

    // 2. Number of songs in every genre
    const songsPerGenre = await Genre.aggregate([
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "genres",
          as: "songs",
        },
      },
      { $unwind: "$songs" }, 
      {
        $group: {
          _id: "$_id",
          genre: { $first: "$name" },
          numSongs: { $sum: 1 },
        },
      }, // Group by genre and count songs
      { $project: { _id: 0, genre: 1, numSongs: 1 } }, 
    ]);

    // 3. Number of songs & albums each artist has
    const songsAndAlbumsPerArtist = await Artist.aggregate([
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "artists",
          as: "songs",
        },
      },
      { $unwind: "$songs" }, 
      {
        $group: {
          _id: "$_id",
          artist: { $first: "$name" },
          numSongs: { $sum: 1 },
          numAlbums: { $first: { $size: "$albums" } }, // Count number of albums using the albums field in Artist schema
        },
      }, // Group by artist and count songs and albums
      { $project: { _id: 0, artist: 1, numSongs: 1, numAlbums: 1 } }, 
    ]);

    // 4. Number of songs in each album
    const songsPerAlbum = await Album.aggregate([
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "album",
          as: "songs",
        },
      },
      { $unwind: "$songs" }, 
      {
        $group: {
          _id: "$_id",
          album: { $first: "$name" },
          numSongs: { $sum: 1 },
        },
      }, // Group by album and count songs
      { $project: { _id: 0, album: 1, numSongs: 1 } }, 
    ]);

    res.status(200).json({
      status: "success",
      data: {
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
        songsPerGenre,
        songsAndAlbumsPerArtist,
        songsPerAlbum,
      },
    });
  }
);
