import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const user =mongoose.Schema({
    _id:Number,
    name:{
        type:String,
        require:[true,"name is require"],
        trim:true,
    },
    email:{
       type:String,
       unique:true,
       require:[true,"email is require"],
       trim:true
    },
    phone:{
      type:Number,
      maxlength:10,
      minlength:10,
      require:true,
      trim:true
    },
    password:{
        type:String,
        minlength:5,
        trim:true
    },
    department:{
       type:String,
       require:true,
       trim:true,
    },
    status:Number,
    role:String
})

user.plugin(mongooseUniqueValidator);

const userSchemaModel=mongoose.model("userDetails",user);

export default userSchemaModel;