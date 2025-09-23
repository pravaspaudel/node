import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const errorMsg = err.message || "something went wrong";

  res.status(statusCode).json({
    success: false,
    message: errorMsg,
  });
}
