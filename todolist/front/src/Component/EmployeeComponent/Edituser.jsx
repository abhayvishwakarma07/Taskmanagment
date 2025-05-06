import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Edituser() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [name,setname]=useState();
  const [email,setemail]=useState();
  const [mobile,setmobile]=useState();
  const [department,setdepartment]=useState();


  useEffect(() => {
    axios.get('http://localhost:3000/user/fetch', {
      params: {
        condition_obj: JSON.stringify({ _id })
      }
    })
      .then(res => {
        console.log(res)
        if (res.data.length > 0) {
           setname(res.data[0].name);
           setemail(res.data[0].email);
           setmobile(res.data[0].mobile);
           setdepartment(res.data[0].department);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, [_id]);

  const handalSubmit=()=>{
       var userDetails={"condition_obj":_id,"content_obj":{"name":name,"email":email,"department":department,"mobile":mobile}};

      axios.patch('http://localhost:3000/user/edit',userDetails).then((res)=>{
        alert("update sucessfullay")
        navigate('/employees')
      })
      .catch((err)=>{
        console.log(err);
      })
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={department}
              onChange={(e) => setdepartment(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Mobile No</label>
            <input
              type="tel"
              name="mobile"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
           type='button'
           onClick={handalSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edituser;
