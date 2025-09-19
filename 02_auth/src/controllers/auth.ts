import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config/env.config";
import jwt from "jsonwebtoken";

import { userSchemaZod, UserInput } from "../middlewares/validate";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: UserInput = userSchemaZod.parse(req.body);

        const { username, email, password, role } = req.body;

        const checkExistence = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if (checkExistence) {
            return next(new Error("User already exists"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role,
        });

        if (newUser) {
            res.status(201).json({ message: "user signed up sucessfully" });
        } else {
            next("Unable to create new user");
        }
    } catch (err) {
        next(err);
    }
};
const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { username, password } = req.body as {
            username: string;
            password: string;
        };

        const user = await userModel.findOne({ username });

        if (!user || !user.password) {
            return next(new Error("User does not exist"));
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(new Error("Invalid credentials"));
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role,
            },
            JWT_SECRET as string,
            { expiresIn: "1d" },
        );

        res.status(200).json({
            message: "Login successful",
            token: accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        next(err);
    }
};

export {signUp, login };
