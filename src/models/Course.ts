import mongoose, { Schema, Document } from "mongoose";

import { ICourse } from "../types";

interface ICourseDocument extends ICourse, Document {}

const courseSchema = new Schema<ICourseDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ICourseDocument>("Course", courseSchema);
