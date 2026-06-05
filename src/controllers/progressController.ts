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

export { getProgress, markLessonComplete };
