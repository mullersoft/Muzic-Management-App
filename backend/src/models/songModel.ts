import mongoose, { Schema, Document } from "mongoose";
export interface ISong extends Document {
  // Export ISong here
  title: string;
  artists: mongoose.Types.ObjectId[]; // Array of artist IDs
  genres: mongoose.Types.ObjectId[]; // Array of genre IDs
  album?: mongoose.Types.ObjectId; // Optional album ID
 fileUrl?: string; // Optional field for file URL

}
const SongSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A song must have a title"],
      trim: true,
      minlength: [1, "A song title must have at least 1 character"],
      maxlength: [
        100,
        "A song title must have less or equal to 100 characters",
      ],
    },
    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: [true, "A song must have an artist ID"],
      },
    ], // Reference to Artist model
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: [true, "A song must have a genre ID"],
      },
    ], // Reference to Genre model
    album: { type: Schema.Types.ObjectId, ref: "Album" }, // Reference to Album model, optional
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
  },
  { timestamps: true }
);
const Song = mongoose.model<ISong>("Song", SongSchema);
export default Song;
