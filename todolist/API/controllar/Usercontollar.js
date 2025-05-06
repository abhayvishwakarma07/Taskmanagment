import '../module/Cannection.js';
import userSchemaModel from '../module/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';

export const save=async (req,res)=>{
    var userlist=await userSchemaModel.find();
    var l=userlist.length;
    var _id=l==0?1:userlist[l-1]._id+1;
    var solt=4;
    var password =await bcrypt.hash(req.body.password,solt);
    var userDetails={...req.body,"_id":_id,"status":0,"password":password,"role":"user"};
    console.log(userDetails);
    try{
   await userSchemaModel.create(userDetails);
    res.status(201).json({"status":true});
    }
    catch(error){
        res.status(500).json({"status":false,"error":error});
    }
}

export const login=async (req,res)=>{
    // console.log(req.body);
    var useremail={"email":req.body.email};
    console.log(useremail);
   var user=await userSchemaModel.find(useremail); 
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

export const fetch = async (req, res) => {
    var condition_obj = req.query.condition_obj;
    var userList = await userSchemaModel.find(condition_obj);
    if (userList.length != 0)
      res.status(200).json(userList);
    else
      res.status(404).json({ "status": "Resource not found" });
  };


  