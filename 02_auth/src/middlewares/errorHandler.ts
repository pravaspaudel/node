import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response<{ success: boolean; message: string }>,
    next: NextFunction,
) {
    console.log("error:", err.message);

    res.status(500).json({
        success: false,
        message: err.message || "something went wrong",
    });
}
