import { NextFunction, Request, Response } from "express";
import { ITodo } from "src/interface";
import Todos from "src/models/todo";
import Users from "src/models/user";

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, category, dueDate } = req.body;
    const { userId } = req.params;

    if (!title || !category || !dueDate || !userId) {
      res.status(400).json({ message: "Required Params are not provided" });
      return;
    }

    const newTodo = new Todos({
      title,
      category,
      dueDate: new Intl.DateTimeFormat("en-GB").format(dueDate),
    });

    await newTodo.save();

    const user = await Users.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user?.todos.push(newTodo._id!);
    await user?.save();

    res.status(201).json({ message: "Todo Created successfully" });
  } catch (error: any) {
    console.log("Erorr ::", error);
    res.status(500).json({ message: error?.message || "Something went wrong" });
  }
};
