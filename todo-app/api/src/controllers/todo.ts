import { NextFunction, Request, Response } from "express";
import Todos from "../models/todo";
import Users from "../models/user";
import { ITodo } from "src/interface";
import mongoose from "mongoose";

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      title,
      category,
      dueDate = new Date(new Date().getDate() + 1),
    } = req.body;
    const { userId } = req.params;

    if (!title || !category || !userId) {
      res.status(400).json({ message: "Required Params are not provided" });
      return;
    }

    if (!validateUserId(req, userId)) {
      res
        .status(401)
        .json({ message: "Not authorized to add todo under this account" });
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

    (user?.todos as mongoose.Types.ObjectId[]).push(
      newTodo._id as mongoose.Types.ObjectId
    );
    await user?.save();

    res.status(201).json({ message: "Todo Created successfully" });
  } catch (error: any) {
    console.log("Erorr ::", error);
    res.status(500).json({ message: error?.message || "Something went wrong" });
  }
};

export const fetchTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const { type, date, status } = req.query;

    const populateOptions: { path: string; match?: any } = { path: "todos" };
    if (date) {
      console.log({ date });
      const inputDate = new Date(date as string).toLocaleDateString("en-Ca");
      const startDate = `${inputDate}T00:00:00.000Z`;
      const endDate = `${inputDate}T23:59:59.999Z`;
      populateOptions.match = { createdAt: { $gte: startDate, $lte: endDate } };
    }

    if (type && type !== "all") {
      populateOptions.match = {
        ...populateOptions.match,
        category: { $in: [type] },
      };
    }

    if (status === "completed") {
      populateOptions.match = {
        ...populateOptions.match,
        status: { $eq: "completed" },
      };
    }

    console.log(populateOptions);

    if (!userId || !validateUserId(req, userId)) {
      res
        .status(401)
        .json({ error: "Not authorized to add todo under this account" });
      return;
    }

    const user = await Users.findById(userId).populate(populateOptions);

    if (!user) {
      res.status(404).json({ error: "User todo list not found" });
      return;
    }

    res.status(200).json({ todos: user.todos });
  } catch (error: any) {
    console.log("Error in fetching todos :: ", error?.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const completeTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, todoId } = req.params;

    if (!userId || !todoId || !validateUserId(req, userId)) {
      res
        .status(401)
        .json({ error: "Not authorized to add todo under this account" });
      return;
    }

    // new true : will send the updated todo
    const updatedTodo = await Todos.findByIdAndUpdate(
      todoId,
      { status: "completed" },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Todo Marked as completed", todo: updatedTodo });
  } catch (error) {
    console.log("Error in completing todos :: ", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const fetchStatistics = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId || !validateUserId(req, userId)) {
    res
      .status(401)
      .json({ error: "Not authorized to add todo under this account" });
    return;
  }

  const user = await Users.findById(userId).populate({
    path: "todos",
  });

  const todos = user?.todos as ITodo[];

  const completedCount = todos.filter(
    (todo) => todo?.status === "completed"
  ).length;
  const pendingCount = todos.filter(
    (todo) => todo?.status === "pending"
  ).length;

  console.log({ completedCount, pendingCount });
  const statistics = {
    completedCount,
    pendingCount,
  }
  res
      .status(200)
      .json({ message: "Todo Marked as completed", statistics });
};

function validateUserId(req: Request, userId: string): boolean {
  return userId === (req as any).user.userId;
}
