import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const EmployeeSchema=mongoose.Schema({
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
    mobile:{
      type:Number,
      maxlength:10,
      minlength:10,
      require:true,
      trim:true
    },
    department:{
       type:String,
       require:true,
       trim:true,
    },
})

EmployeeSchema.plugin(mongooseUniqueValidator);

const EmployeeSchemaModel=mongoose.model("EmployeeDetails",EmployeeSchema);

export default EmployeeSchemaModel;