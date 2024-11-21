import { NextFunction, Request, Response } from "express";
import Todos from "../models/todo";
import Users from "../models/user";

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, category, dueDate = new Date(new Date().getDate() + 1) } = req.body;
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

    user?.todos.push(newTodo._id!);
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

    if (!userId || !validateUserId(req, userId)) {
      res
        .status(401)
        .json({ error: "Not authorized to add todo under this account" });
      return;
    }

    const user = await Users.findById(userId).populate("todos");

    if (!user) {
      res.status(404).json({ error: "User todo list not found" });
      return;
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    console.log("Error in fetching todos :: ", error);
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

    if(!updatedTodo){
      res.status(404).json({error : "Todo not found"});
      return;
    }

    res.status(200).json({message : "Todo Marked as completed",todo : updatedTodo});
  } catch (error) {
    console.log("Error in completing todos :: ", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

function validateUserId(req: Request, userId: string): boolean {
  return userId === (req as any).user.userId;
}
