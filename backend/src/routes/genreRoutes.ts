import { Router } from "express";
import {
  listGenres,
  createGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../controllers/genreController";
const router = Router();
router.route("/").get(listGenres).post(createGenre);
router.route("/:id").get(getGenreById).patch(updateGenre).delete(deleteGenre);
export default router;
