import mongoose from "mongoose";

const todoSchema=mongoose.Schema({
    _id:Number,
    useremail:String,
    title:String,
    description:String,
    info:String,
})

const todoSchemamodule=mongoose.model('todolist',todoSchema);

export default todoSchemamodule;