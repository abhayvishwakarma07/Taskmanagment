import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const AdminSchema =mongoose.Schema({
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
    }
})

AdminSchema.plugin(mongooseUniqueValidator);

const AdminSchemaModel=mongoose.model("adminDetails",AdminSchema);

export default AdminSchemaModel;