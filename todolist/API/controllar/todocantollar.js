import '../module/Cannection.js';
import todoSchemamodule from '../module/todoSchema.js';

export const save =async (req,res)=>{
    var todo=await todoSchemamodule.find();
    var l= todo.length;
    var _id=l==0?1:todo[l-1]._id+1;
    
    var newtodo={...req.body,"_id":_id,"info":Date()};
    try{
        await todoSchemamodule.create(newtodo);
        res.status(201).json({"status":true});
    }
    catch{
        res.status(500).json({"status":false});
    }
}

export const fetch= async (req, res) => {
    var condition_obj = req.query.condition_obj;
    console.log(condition_obj);
    var userList = await todoSchemamodule.find(condition_obj);
    if (userList.length != 0)
      res.status(200).json(userList);
    else
      res.status(404).json({ "status": "Resource not found" });
  };


export const deletetodo = async (req, res) => {
    console.log(req.body)
    let todo= await todoSchemamodule.findOne(req.body);
    if (todo) {
      let todo = await todoSchemamodule.deleteOne(req.body);
      if (todo)
        res.status(200).json({ "msg": "success" });
      else
        res.status(500).json({ "status": "Server Error" });
    }
    else
      res.status(404).json({ "status": "Requested resource not available" });
  };