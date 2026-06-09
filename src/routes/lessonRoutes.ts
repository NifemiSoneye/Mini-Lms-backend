import express from "express";
import {
  addLesson,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController";
import verifyJWT from "../middleware/verifyJWT";
import verifyAdmin from "../middleware/verifyAdmin";

const router = express.Router();

router.use(verifyJWT);
router.route("/courses/:courseId/lessons").post(verifyAdmin, addLesson);
router.route("/courses/:courseId/lessons/:id").patch(verifyAdmin, updateLesson);
router
  .route("/courses/:courseId/lessons/:id")
  .delete(verifyAdmin, deleteLesson);

export default router;
