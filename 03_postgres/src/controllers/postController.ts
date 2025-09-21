import { pool } from "../config/postgres";
import { NextFunction, Request, Response } from "express";

const getPostByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT posts.id, posts.title, posts.content, posts.created_at,
             users.id AS user_id, users.username, users.email
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE users.username = $1`,
      [username],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.json({
      success: true,
      result: result.rows,
    });
  } catch (error) {
    next(error);
  }
};



export { getPostByUser };
