import mongoose, { Schema, Document } from "mongoose";

interface IAlbum extends Document {
  title: string;
  songs: mongoose.Types.ObjectId[]; // Array of song IDs
}

const AlbumSchema: Schema = new Schema(
  {
    name: {
    type: String,
    required: [true, "A song must have an album"],
    trim: true,
    minlength: [1, "Album name must have at least 1 character"],
    maxlength: [100, "Album name must have less or equal to 100 characters"], },
    songs: [{ type: Schema.Types.ObjectId, ref: "Song" }], // Reference to Song model
  },
  { timestamps: true }
);

const Album = mongoose.model<IAlbum>("Album", AlbumSchema);

export default Album;
