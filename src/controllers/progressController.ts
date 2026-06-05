import Course from "../models/Course";
import Lesson from "../models/Lesson";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Progress from "../models/Progress";

const getProgress = asyncHandler(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const user = req.user?.id;

  const progress = await Progress.find({ user: user, course: courseId }).exec();
  if (!progress) {
    res.json({ completedLessons: [] });
  }
  res.json(progress);
});
const markLessonComplete = asyncHandler(async (req: Request, res: Response) => {
  const { courseId, lessonId } = req.params;
  const user = req.user?.id;
  const progress = await Progress.find({ user: user, course: courseId }).exec();
  if (!progress) {
    const progressObject = {
      title,
      youtubeUrl,
      order,
      course: new mongoose.Types.ObjectId(courseId as string),
    };
    const lesson = await Lesson.create(lessonObject);
  }
});
