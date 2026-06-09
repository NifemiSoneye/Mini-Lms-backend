import express from "express";
import {
  getProgress,
  markLessonComplete,
  getMyCourses,
  enrollInCourse,
} from "../controllers/progressController";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.route("/progress/my-courses").get(getMyCourses);
router.route("/progress/:courseId/enroll").post(enrollInCourse);
router.route("/progress/:courseId/lessons/:lessonId").post(markLessonComplete);
router.route("/progress/:courseId").get(getProgress);

export default router;
