import mongoose from "mongoose";

export interface IUser {
    name : string;
    email : string;
    password : string;
    todos : mongoose.Types.ObjectId[];
}

export interface ITodo {
    title : string;
    status : "pending" | "completed";
    category : "all" | "personal" | "work";
    dueDate :string;
}