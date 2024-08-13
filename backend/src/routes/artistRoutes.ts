import { Router } from "express";
import {
  listArtists,
  createArtist,
  getArtistById,
  updateArtist,
  deleteArtist,
} from "../controllers/artistController";
const router = Router();
router.route("/").get(listArtists).post(createArtist);
router
  .route("/:id")
  .get(getArtistById)
  .patch(updateArtist)
  .delete(deleteArtist);
export default router;
