import axios from 'axios'
import React, { use, useEffect, useState } from 'react'

function UserList() { 
    const [user,setuser]=useState([]); 
  
    useEffect(()=>{
      var condition_obj={"role":"user"};
      axios.get('http://localhost:3000/user/fetch',{
        params:{"condition_obj": condition_obj}}
          ).then((response)=>{
        setuser(response.data);
      }).catch((error)=>{
        console.log(error);
      })   
    });
  
  return (
    <>
    <div className='flex items-center h-screen justify-center'>
      <div className='min-h-[500px] w-[700px]'>
      <table className='border-1 w-full '>
      <thead>
      <tr className='border-1 '>
          <th className='border'>_id</th>
          <th className='border'>name</th>
          <th className='border'>email</th>
          <th className='border'>department</th>
        </tr>
      </thead>
      <tbody>
        {user.map((data)=>(
            <tr className='border'>
              <td className='border'>{data._id}</td>
              <td className='border' >{data.name}</td>
              <td className='border'>{data.email}</td>
              <td className='border'>{data.department}</td>          
            </tr>
          ))
        }
        </tbody>
      </table>
      </div>
    </div>
    </>
  )
}

export default UserList