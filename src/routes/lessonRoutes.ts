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
router.use(verifyAdmin);
router.route("/courses/:courseId/lessons").post(addLesson);
router.route("/courses/:courseId/lessons/:id").patch(updateLesson);
router.route("/courses/:courseId/lessons/:id").delete(deleteLesson);

export default router;
