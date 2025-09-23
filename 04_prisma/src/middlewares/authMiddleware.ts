import { Request, Response, NextFunction } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(`auth middleware it`);
  } catch (err) {
    res.status(402).json({
      sucess: false,
      message: "go and get authorized first",
    });
  }
};

export default authMiddleware;
