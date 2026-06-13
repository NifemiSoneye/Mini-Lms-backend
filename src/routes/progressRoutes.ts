import express from "express";
import {
  getProgress,
  markLessonComplete,
  getMyCourses,
  enrollInCourse,
  unenrollFromCourse,
} from "../controllers/progressController";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.route("/progress/my-courses").get(verifyJWT, getMyCourses);
router.route("/progress/:courseId/enroll").post(verifyJWT, enrollInCourse);
router
  .route("/progress/:courseId/lessons/:lessonId")
  .post(verifyJWT, markLessonComplete);
router.route("/progress/:courseId").get(verifyJWT, getProgress);
router
  .route("/progress/:courseId/unenroll")
  .delete(verifyJWT, unenrollFromCourse);

export default router;
