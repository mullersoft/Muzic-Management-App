import mongoose, { Document, Schema } from "mongoose";

interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
  fileUrl?: string; // Optional field for file URL
}

const songSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "A song must have a title"],
    trim: true,
    minlength: [1, "A song title must have at least 1 character"],
    maxlength: [100, "A song title must have less or equal to 100 characters"],
  },
  artist: {
    type: String,
    required: [true, "A song must have an artist"],
    trim: true,
    minlength: [1, "Artist name must have at least 1 character"],
    maxlength: [100, "Artist name must have less or equal to 100 characters"],
  },
  album: {
    type: String,
    required: [true, "A song must have an album"],
    trim: true,
    minlength: [1, "Album name must have at least 1 character"],
    maxlength: [100, "Album name must have less or equal to 100 characters"],
  },
  genre: {
    type: String,
    required: [true, "A song must have a genre"],
    trim: true,
    minlength: [1, "Genre name must have at least 1 character"],
    maxlength: [50, "Genre name must have less or equal to 50 characters"],
  },
  fileUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function (value: string) {
        return value.length > 0;
      },
      message: "File URL must not be empty",
    },
  },
});

const Song = mongoose.model<ISong>("Song", songSchema);
export default Song;
