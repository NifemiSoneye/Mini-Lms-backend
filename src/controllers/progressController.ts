import Course from "../models/Course";
import Lesson from "../models/Lesson";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Progress from "../models/Progress";
import mongoose from "mongoose";

const getProgress = asyncHandler(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const userId = req.user?.id;

  const progress = await Progress.findOne({
    user: userId,
    course: courseId,
  }).exec();
  if (!progress) {
    res.json({ completedLessons: [] });
    return;
  }
  res.json(progress);
});

const getMyCourses = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const myProgress = await Progress.find({ user: userId })
    .populate("course")
    .lean();

  const progressWithCount = await Promise.all(
    myProgress.map(async (p) => {
      const course = p.course as any;
      const lessonCount = await Lesson.countDocuments({ course: course._id });
      return { ...p, course: { ...course, lessonCount } };
    }),
  );

  res.json(progressWithCount);
});

const enrollInCourse = asyncHandler(async (req: Request, res: Response) => {
  console.log("Enroll hit", req.user, req.params);
  const userId = req.user?.id;
  const { courseId } = req.params as { courseId: string };

  if (!courseId) {
    res.status(400).json({ message: "Course ID required" });
    return;
  }

  const alreadyEnrolled = await Progress.findOne({
    user: userId,
    course: courseId,
  });
  if (alreadyEnrolled) {
    res.status(400).json({ message: "Already enrolled in this course" });
    return;
  }

  const progress = await Progress.create({
    user: userId,
    course: courseId,
    completedLessons: [],
  });

  res.status(201).json({ message: "Enrolled successfully", progress });
});
const markLessonComplete = asyncHandler(async (req: Request, res: Response) => {
  const { courseId, lessonId } = req.params;
  const userId = req.user?.id;
  let progress = await Progress.findOne({
    user: new mongoose.Types.ObjectId(userId as string),
    course: new mongoose.Types.ObjectId(courseId as string),
  }).exec();
  if (!progress) {
    progress = await Progress.create({
      user: new mongoose.Types.ObjectId(userId as string),
      course: new mongoose.Types.ObjectId(courseId as string),
      completedLessons: [],
    });
  }
  const alreadyCompleted = progress.completedLessons
    .map((id) => id.toString())
    .includes(lessonId as string);

  if (alreadyCompleted) {
    res.json(progress);
    return;
  }

  progress.completedLessons.push(
    new mongoose.Types.ObjectId(lessonId as string),
  );
  const updatedProgress = await progress.save();
  res.json(updatedProgress);
});

export { getProgress, markLessonComplete, getMyCourses, enrollInCourse };
