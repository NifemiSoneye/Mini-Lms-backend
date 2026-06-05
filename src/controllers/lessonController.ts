import mongoose from "mongoose";
import Lesson from "../models/Lesson";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

const addLesson = asyncHandler(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { title, youtubeUrl, order } = req.body;
  if (!title || !youtubeUrl || !order) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  const duplicate = await Lesson.findOne({ title, course: courseId }).lean();
  if (duplicate) {
    res.status(409).json({
      message: "Duplicate Title",
    });
    return;
  }
  const lessonObject = {
    title,
    youtubeUrl,
    order,
    course: new mongoose.Types.ObjectId(courseId as string),
  };
  const lesson = await Lesson.create(lessonObject);

  if (lesson) {
    res
      .status(201)
      .json({ message: `New Lesson "${title}" created , `, lesson });
  } else {
    res.status(400).json({ message: "Invalid Lesson data recieved" });
  }
});
const updateLesson = asyncHandler(async (req: Request, res: Response) => {
  const { id, courseId } = req.params;
  const { title, youtubeUrl, order } = req.body;
  if (!title || !youtubeUrl || !order) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  const lesson = await Lesson.findById(id).exec();
  if (!lesson) {
    res.status(404).json({
      message: "Lesson not found",
    });
    return;
  }
  const duplicate = await Lesson.findOne({ title, course: courseId }).lean();

  if (duplicate && duplicate?._id.toString() !== id) {
    res.status(409).json({
      message: "Duplicate Title",
    });
    return;
  }

  lesson.title = title;
  lesson.youtubeUrl = youtubeUrl;
  lesson.order = order;

  const updatedLesson = await lesson.save();
  res.json({ message: `${updatedLesson.title} updated` });
});
const deleteLesson = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: "Lesson ID required",
    });
    return;
  }

  const lesson = await Lesson.findById(id).exec();

  if (!lesson) {
    res.status(404).json({
      message: "Lesson not found",
    });
    return;
  }

  const result = await lesson.deleteOne();

  res.json(`Lesson "${lesson.title}" deleted`);
});

export { addLesson, updateLesson, deleteLesson };
