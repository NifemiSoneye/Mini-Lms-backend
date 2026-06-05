import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connectDB from "./config/dbConn";
import errorHandler from "./middleware/errorHandler";
import { logEvents, logger } from "./middleware/logger";
import authRoutes from "./routes/authRoutes";
import corsOptions from "./config/corsOptions";
import courseRoutes from "./routes/courseRoutes";
import lessonRoutes from "./routes/lessonRoutes";
import progressRoutes from "./routes/progressRoutes";
const app = express();
const PORT = process.env.PORT || 3500;
connectDB();
app.use(logger);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/auth", authRoutes);
app.use("/", courseRoutes);
app.use("/", lessonRoutes);
app.use("/", progressRoutes);

app.all(/.*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t ${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log",
  );
});
