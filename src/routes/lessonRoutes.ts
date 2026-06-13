import express from "express";
import {
  addLesson,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController";
import verifyJWT from "../middleware/verifyJWT";
import verifyAdmin from "../middleware/verifyAdmin";

const router = express.Router();

router
  .route("/courses/:courseId/lessons")
  .post(verifyJWT, verifyAdmin, addLesson);
router
  .route("/courses/:courseId/lessons/:id")
  .patch(verifyJWT, verifyAdmin, updateLesson);
router
  .route("/courses/:courseId/lessons/:id")
  .delete(verifyJWT, verifyAdmin, deleteLesson);

export default router;
