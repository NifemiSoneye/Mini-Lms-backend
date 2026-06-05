import mongoose from "mongoose";
export interface IUser {
  name: string;
  password: string;
  email: string;
  refreshToken?: string[];
  role: string;
}
export interface ICourse {
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  isPublished: boolean;
}
export interface ILesson {
  title: string;
  course: mongoose.Types.ObjectId;
  order: number;
  youtubeUrl: string;
}
export interface IProgress {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  completedLessons: mongoose.Types.ObjectId[];
}
