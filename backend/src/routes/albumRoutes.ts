import { Router } from "express";
import {
  listAlbums,
  createAlbum,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from "../controllers/albumController";
const router = Router();
router.route("/").get(listAlbums).post(createAlbum);
router.route("/:id").get(getAlbumById).patch(updateAlbum).delete(deleteAlbum);
export default router;
