import { NextFunction, Request, Response } from "express";
import Users from "../models/user";
import jwt from "jsonwebtoken"

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("R")
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      throw new Error("Required fields are not provided");

    const existingUser = await Users.findOne({ email });

    if (existingUser) throw new Error("Email already exists");

    const newUser = new Users({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.log(error?.message || "Error in registering the user");
    res.status(500).json({ message: error?.message || "Registration failed" });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new Error("Required fields are not provided");

    const user = await Users.findOne({ email }).select({password : -1});

    if (!user) throw new Error("Invalid Email");

    if (user.password !== password) throw new Error("Invalid Password");

    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET!);

    res.status(200).json({user, token});

  } catch (error: any) {
    console.log(error?.message || "Error in Login the user");
    res.status(500).json({ message: error?.message || "Login failed" });
  }
};
