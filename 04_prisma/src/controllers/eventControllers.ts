import { Request, Response, NextFunction } from "express";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("create events hit");
  } catch (err) {
    next(err);
  }
};

export { createEvent };
