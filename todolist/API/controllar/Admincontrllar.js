import '../module/Cannection.js';
import AdminSchemaModel from '../module/AdminSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';

export const save=async (req,res)=>{
   // console.log(req.body);
    var userlist=await AdminSchemaModel.find();
    var l=userlist.length;
    var _id=l==0?1:userlist[l-1]._id+1;
    var solt=4;
    var password =await bcrypt.hash(req.body.password,solt);
    var userDetails={...req.body,"_id":_id,"password":password};
    try{
   await AdminSchemaModel.create(userDetails);
    res.status(201).json({"status":true});
    }
    catch(error){
        res.status(500).json({"status":false,"error":error});
    }
}

export const login=async (req,res)=>{
    var useremail={"email":req.body.email};

   var user=await AdminSchemaModel.find(useremail); 
   if(user && user.length > 0){ 
     var match=await bcrypt.compare(req.body.password,user[0].password);
     if(match){
        var key=rs.generate(10);
        var paylod=user[0].email;
        var token=jwt.sign(key,paylod);
        res.status(200).json({"massage":"user is login","token":token ,"user":user[0]});
     }
     else{
        res.status(401).json({"massage":"password is not match"});
     }
   }else{
      res.status(404).json({"massage":"user not found"});
   }
}