import express from "express";
import {
  getProgress,
  markLessonComplete,
} from "../controllers/progressController";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.use(verifyJWT);
router.route("/progress/:courseId").get(getProgress);
router.route("/progress/:courseId/lessons/:lessonId").post(markLessonComplete);

export default router;
