import { Router } from "express";
import {
  listSongs,
  updateSong,
  deleteSong,
  createSong,
  uploadFile,
  getSongById,
} from "../controllers/songController";
const router = Router();
// Define your routes
router.route("/").get(listSongs).post(uploadFile, createSong);
router.route("/:id").get(getSongById).patch(updateSong).delete(deleteSong);
export default router;
