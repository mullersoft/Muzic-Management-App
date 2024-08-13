import mongoose, { Schema, Document } from "mongoose";

interface IGenre extends Document {
  name: string;
  songs: mongoose.Types.ObjectId[]; // Array of song IDs
}

const GenreSchema: Schema = new Schema(
  {
    name: {
    type: String,
    required: [true, "A song must have a genre"],
    trim: true,
    minlength: [1, "Genre name must have at least 1 character"],
    maxlength: [50, "Genre name must have less or equal to 50 characters"], },
    songs: [{ type: Schema.Types.ObjectId, ref: "Song" }], // Reference to Song model
  },
  { timestamps: true }
);

const Genre = mongoose.model<IGenre>("Genre", GenreSchema);

export default Genre;
