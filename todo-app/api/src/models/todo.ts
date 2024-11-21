import mongoose from "mongoose";
import { ITodo } from "../interface";

const todoSchema = new mongoose.Schema<ITodo>(
    {
      title: {
        type: String,
        required: [true, "Title is a required field"],
      },
      status: {
        type: String,
        enum : ["pending" , "completed"],
        default : "pending"
      },
      category: {
        type: String,
        enum : ["all", "work", "personal", "wishlist"],
        default : "all"
      },
      dueDate : {
        type : String,
        required : true
      }
    },
    { timestamps: true }
  );
  
  const Todos = mongoose.model<ITodo>("Todos", todoSchema);
  
  export default Todos;
  