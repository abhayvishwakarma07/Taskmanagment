import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Log_in(){
  const navigate=useNavigate();
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');

  const handalsumit=()=>{
     if(!email) return seterror('eamil is require');
     if(!password) return seterror('password is require');
    const useDetails={"email":email,"password":password};
   
    axios.post('http://localhost:3000/user/login',useDetails).then((res)=>{
       alert("login seccessfull")
       console.log(res.data.token)
       var user=res.data.user
       localStorage.setItem("token",res.data.token);
       localStorage.setItem("name",user.name);
       localStorage.setItem("email",user.email);
       localStorage.setItem("role",user.role);
       navigate("/");
    }).catch((err)=>{
     console.log(err);
    })
  }
  return (
    <>
    <div  className='flex justify-center items-center min-h-screen overflow-hidden'>
      <div className='flex flex-col items-center justify-center w-[494px] h-[436px] border-4 rounded-xl border-gray-500 '>
      <h1 className='flex  text-4xl justify-center'>Login</h1>
      <form action="" className='w-[411px] h-[273px] flex flex-col justify-center'>
        <div className=''>
        <h5 className='p-3'>Email/mobile</h5>
        < input type="text" className='bg-white w-[410px] h-[50px] rounded-lg text-black' placeholder='example@gmail.com' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        </div>
        <div>
        <h5 className='p-3'>Password</h5>
        < input type="password" className='bg-white w-[410px] h-[50px] rounded-lg text-black' placeholder='********' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
        </div>
        <button className='w-full h-[54px] bg-green-500 rounded-lg mt-8' type='button' onClick={handalsumit}>Login</button>
      </form>
       <p className='pt-10'>Not a member? <Link to='/Sign_up'>Sign-Up</Link></p>
      </div>
    </div>
    </>
  )
}

export default Log_in;