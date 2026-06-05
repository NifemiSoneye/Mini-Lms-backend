import mongoose, { Schema, Document } from "mongoose";

import { IProgress } from "../types";

interface IProgressDocument extends IProgress, Document {}

const progressSchema = new Schema<IProgressDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IProgressDocument>("Progress", progressSchema);
