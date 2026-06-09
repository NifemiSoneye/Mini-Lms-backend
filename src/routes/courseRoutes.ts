import express from "express";
import {
  getAllCourses,
  togglePublish,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import verifyJWT from "../middleware/verifyJWT";
import verifyAdmin from "../middleware/verifyAdmin";

const router = express.Router();

router.route("/courses").get(getAllCourses);
router.route("/courses/:id").get(getCourseById);
router.use(verifyJWT);
router.route("/courses").post(verifyAdmin, createCourse);
router.route("/courses/:id").patch(verifyAdmin, updateCourse);
router.route("/courses/:id/publish").patch(verifyAdmin, togglePublish);
router.route("/courses/:id").delete(verifyAdmin, deleteCourse);

export default router;
