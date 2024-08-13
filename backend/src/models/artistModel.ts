import mongoose, { Schema, Document } from "mongoose";
interface IArtist extends Document {
  name: string;
  songs: mongoose.Types.ObjectId[]; // Array of song IDs
  albums: mongoose.Types.ObjectId[]; // Array of album IDs
}
const ArtistSchema: Schema = new Schema(
  {
    name: {
    type: String,
    required: [true, "A song must have an artist"],
    trim: true,
    minlength: [1, "Artist name must have at least 1 character"],
    maxlength: [100, "Artist name must have less or equal to 100 characters"], },
    songs: [{ type: Schema.Types.ObjectId, ref: "Song" }], // Reference to Song model
    albums: [{ type: Schema.Types.ObjectId, ref: "Album" }], // Reference to Album model
  },
  { timestamps: true }
);
const Artist = mongoose.model<IArtist>("Artist", ArtistSchema);
export default Artist;
