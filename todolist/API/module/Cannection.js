import mongoose from "mongoose";

const url ='mongodb://localhost:27017/todolist';

mongoose.connect(url)
console.log("database cannected");