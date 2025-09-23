import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";
import { comparePasswords, hashPassword } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config";

enum RoleType {
  admin = "ADMIN",
  user = "USER",
}

type userType = {
  name: string;
  email: string;
  password: string;
  role: RoleType[];
};

type LoginType = Pick<userType, "email" | "password">;

const registerUser = async (
  req: Request<{}, {}, userType>,
  res: Response<{ success: boolean; message: string; result?: any }>,
  next: NextFunction
) => {
  try {
    const { name, email, password, role = ["USER"] } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "user already exists. Try login",
      });
    }

    const hashedPass = await hashPassword(password);

    const createUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPass,
        role: role,
      },
    });

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      result: createUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request<{}, {}, LoginType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user doesn't exists",
      });
    }

    const isValidPass = comparePasswords(password, user.password);

    if (!isValidPass) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, login };
