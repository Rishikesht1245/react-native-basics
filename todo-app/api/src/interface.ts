import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    name : string;
    email : string;
    password : string;
    todos : mongoose.Types.ObjectId[] | ITodo[];
}

export interface ITodo extends Document{
    title : string;
    status : "pending" | "completed";
    category : "all" | "personal" | "work";
    dueDate :string;
}