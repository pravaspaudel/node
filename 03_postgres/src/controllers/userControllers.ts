import { Response, Request, NextFunction } from "express";
import { pool } from "../config/postgres";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: "username and email are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *`,
      [username, email],
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

const detailsUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User details retrieved",
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

const postContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, title, content } = req.body;

    if (!user_id || !title || !content) {
      return res.status(400).json({
        success: false,
        message: "user_id, title, and content are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, title, content],
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

export { getAllUsers, createUser, detailsUser, postContent };
