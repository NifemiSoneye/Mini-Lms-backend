import mongoose, { Schema, Document } from "mongoose";

import { ILesson } from "../types";

interface ILessonDocument extends ILesson, Document {}

const lessonSchema = new Schema<ILessonDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    youtubeUrl: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ILessonDocument>("Lesson", lessonSchema);
