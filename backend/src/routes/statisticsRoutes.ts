import { Router } from "express";
import { getStatistics } from "../controllers/statisticsController";
const router = Router();
router.route("/").get(getStatistics);
export default router;
