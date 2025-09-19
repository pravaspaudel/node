import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env.config";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    const token = header?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: "false",
            message: "Access denied",
        });
    }

    try {
        if (!JWT_SECRET) {
            console.log("error in accessin jwt secret");
            return;
        }

        const decodeToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
        console.log(decodeToken);

        next();
    } catch (err) {
        next(err);
    }
};

export { authMiddleware };
