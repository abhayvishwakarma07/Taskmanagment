import '../module/Cannection.js';
import EmployeeSchemaModel from '../module/EmpoloyeSchema.js';


export const save=async (req,res)=>{
    var userlist=await EmployeeSchemaModel.find();
    var l=userlist.length;
    var _id=l==0?1:userlist[l-1]._id+1;
    var userDetails={...req.body,"_id":_id};
    // console.log(userDetails);
    try{
   await EmployeeSchemaModel.create(userDetails);
    res.status(201).json({"status":true});
    }
    catch(error){
        res.status(500).json({"status":false,"error":error});
    }
}

export const fetch = async (req, res) => {
  try {
    const condition_obj = req.query.condition_obj 
      ? JSON.parse(req.query.condition_obj) 
      : {};
    const userList = await EmployeeSchemaModel.find(condition_obj);
    if (userList.length > 0) {
      res.status(200).json(userList);
    } else {
      res.status(404).json({ status: "Resource not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "Error fetching data", error: error.message });
  }
};


  export const deleteemp = async (req, res) => {
    try {
      // console.log("Request body:", req.body);
      const emp = await EmployeeSchemaModel.findOne(req.body);
      if (emp) {
        await EmployeeSchemaModel.deleteOne(req.body);
        res.status(200).json({ status: true, message: "User deleted successfully" });
      } else {
        res.status(404).json({ status: false, message: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  };
  
export const edit=async(req,res)=>{
  const user={"_id":req.body.condition_obj};
  let userDetails=await EmployeeSchemaModel.find(user);
  if(userDetails){
    let update= await EmployeeSchemaModel.updateOne( user, { $set: req.body.content_obj });
    if(update){
      res.status(200).json({ "msg": "success" });
    }
    else{
      res.status(500).json({ "status": "Server Error" });
    }
  }
  else{
    res.status(404).json({ "status": "Requested resource not available" });
  }
}


  