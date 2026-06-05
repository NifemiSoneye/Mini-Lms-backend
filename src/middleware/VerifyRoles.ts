import { Request, Response, NextFunction } from "express";

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") return res.sendStatus(403);
  next();
};

export default verifyAdmin;
