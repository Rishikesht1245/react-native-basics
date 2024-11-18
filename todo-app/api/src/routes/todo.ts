import { NextFunction, Request, Response, Router } from "express";
import { addTodo } from "src/controllers/todo";

const todoRouter = Router();

todoRouter.route("/:userId").post(isAuth, addTodo);

function isAuth(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers["AUTH_TOKEN"];
  
    if (!token) {
      res.status(401).json({ message: "Unauthorized user" });
      return;
    }
    next();
  }
  

export default todoRouter;
