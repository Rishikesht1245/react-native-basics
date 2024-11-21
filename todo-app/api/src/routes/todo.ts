import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { addTodo, completeTodo, fetchTodos } from "../controllers/todo";

const todoRouter = Router();

todoRouter
  .route("/:userId")
  .post(isAuth, addTodo)
  .get(isAuth, fetchTodos)
  
todoRouter.patch("/:userId/:todoId", isAuth, completeTodo);

function isAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers["auth_token"];

  if (!token) {
    res.status(401).json({ message: "Unauthorized user" });
    return;
  }

  const user = jwt.verify(token as string, process.env.JWT_SECRET!);
  console.log({ user });

  (req as any).user = user;
  next();
}

export default todoRouter;
