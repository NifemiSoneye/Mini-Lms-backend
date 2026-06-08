import Course from "../models/Course";
import Lesson from "../models/Lesson";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Progress from "../models/Progress";

const getAllCourses = asyncHandler(async (req: Request, res: Response) => {
  const courses = await Course.find({ isPublished: true }).lean();
  const coursesWithCount = await Promise.all(
    courses.map(async (course) => {
      const lessonCount = await Lesson.countDocuments({ course: course._id });
      return { ...course, lessonCount };
    }),
  );

  res.json(coursesWithCount);
});
const getCourseById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: "Course ID required",
    });
    return;
  }
  const course = await Course.findById(id).exec();
  const lessons = await Lesson.find({ course: id }).sort({ order: 1 }).lean();

  if (!course) {
    res.status(404).json({
      message: "Course not found",
    });
    return;
  }
  res.json({ course, lessons });
});
const createCourse = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, category, thumbnailUrl } = req.body;
  if (!title || !description || !category || !thumbnailUrl) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  const duplicate = await Course.findOne({ title }).lean();
  if (duplicate) {
    res.status(409).json({
      message: "Duplicate Title",
    });
    return;
  }
  const courseObject = {
    title,
    description,
    category,
    thumbnailUrl,
  };
  const course = await Course.create(courseObject);

  if (course) {
    res
      .status(201)
      .json({ message: `New Course "${title}" created , `, course });
  } else {
    res.status(400).json({ message: "Invalid Course data recieved" });
  }
});
const updateCourse = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, category, thumbnailUrl } = req.body;
  const { id } = req.params;
  if (!title || !description || !category || !thumbnailUrl || !id) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }

  const course = await Course.findById(id).exec();
  if (!course) {
    res.status(404).json({
      message: "Course not found",
    });
    return;
  }
  const duplicate = await Course.findOne({ title }).lean();

  if (duplicate && duplicate?._id.toString() !== id) {
    res.status(409).json({
      message: "Duplicate Title",
    });
    return;
  }

  course.title = title;
  course.description = description;
  course.category = category;
  course.thumbnailUrl = thumbnailUrl;

  const updatedCourse = await course.save();
  res.json({ message: `${updatedCourse.title} updated` });
});
const togglePublish = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: "Course ID required",
    });
    return;
  }

  const course = await Course.findById(id).exec();
  if (!course) {
    res.status(404).json({
      message: "Course not found",
    });
    return;
  }
  course.isPublished = !course.isPublished;

  const toggledCourse = await course.save();
  res.json({ message: `${toggledCourse.title} toggled` });
});
const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: "Course ID required",
    });
    return;
  }

  const course = await Course.findById(id).exec();

  if (!course) {
    res.status(404).json({
      message: "Course not found",
    });
    return;
  }

  await Lesson.deleteMany({ course: id });
  await Progress.deleteMany({ course: id });

  const result = await course.deleteOne();

  res.json(`Course "${course.title}" deleted`);
});

export {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  togglePublish,
};
