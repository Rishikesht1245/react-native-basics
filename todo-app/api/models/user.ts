import mongoose from "mongoose";
import { IUser } from "../interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
    // embedding
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todos",
      },
    ],
  },
  { timestamps: true }
);

const Users = mongoose.model<IUser>("Users", userSchema);

export default Users;
