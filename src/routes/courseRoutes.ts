import express from "express";
import {
  getAllCourses,
  togglePublish,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getStats,
  getAllCoursesAdmin,
} from "../controllers/courseController";
import verifyJWT from "../middleware/verifyJWT";
import verifyAdmin from "../middleware/verifyAdmin";

const router = express.Router();

router.route("/courses").get(getAllCourses);
router.route("/courses/:id").get(getCourseById);
router.route("/courses").post(verifyJWT, verifyAdmin, createCourse);
router.route("/courses/:id").patch(verifyJWT, verifyAdmin, updateCourse);
router
  .route("/courses/:id/publish")
  .patch(verifyJWT, verifyAdmin, togglePublish);
router.route("/courses/:id").delete(verifyJWT, verifyAdmin, deleteCourse);
router.route("/admin/stats").get(verifyJWT, verifyAdmin, getStats);
router.route("/admin/courses").get(verifyJWT, verifyAdmin, getAllCoursesAdmin);
export default router;
