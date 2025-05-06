import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Sign_up() {
  const navigate =useNavigate();
   const [name,setname]=useState('');
   const [email,setemail]=useState('');
   const [password,setpassword]=useState('');
   const [mobile,setmobile]=useState('');
   const [department,setdepartment]=useState('');
   const [emailerror,setemailerror]=useState('');
   const [error,seterror]=useState('');
   const handalsubmition=()=>{
     if(!name) return seterror("name is require");
     if(!email) return seterror("email is require");
     if(!password) return seterror("password is require");
     if(!mobile) return seterror("mobile is require");
     if(!department) return seterror("department is require");
    
     setTimeout(() => {
      seterror('')
     },3000);

      const userDetails={"name":name,"email":email,"mobile":mobile,"password":password,"department":department}
      console.log(userDetails);
         axios.post('http://localhost:3000/user/save',userDetails).then((res)=>{
          alert("reagistration successfull")
          setemail('')
          setname('')
          setmobile('')
          setpassword('')
          setdepartment('')
          navigate('/login');
         }).catch((error)=>{
          var error=error.response.data.error.errors
          if(error.email){
            setemailerror('this email is already exist')
            setTimeout(() => {
              setemailerror('')
            },3000);

            setemail('')
            setname('')
            setmobile('')
            setpassword('')
            setdepartment('')
          }
         })
   }

  return (
    <>
    <div className='p-5 w-full flex justify-center min-h-screen mt-20'>
      <div className='w-auto md:h-[798px] sm:w-[494px] border-3 rounded-xl justify-center items-center flex flex-col w-full px-10'>
        <p className='text-red-500 text-2xl'>{error}</p>
        <div><h1 className='font-bold text-4xl'>Sign Up</h1></div>
        <div className='w-full'>
        <h1 className='m-3'>Full Name</h1>
        <input type="text" className='bg-white text-black h-[51px] w-full md:w-[410px] rounded-lg' value={name} onChange={(e) => setname(e.target.value)} placeholder="name"/>
        </div>
        <div>
        </div>
        <div className='w-full'>
        <h1 className='m-3'>Email</h1>
        <input type="email" className='bg-white text-black w-full h-[51px] md:w-[410px] rounded-lg' value={email} onChange={(e) => setemail(e.target.value)} placeholder="email" />
        <p className='h-[20px] text-red-500'>{emailerror}</p>
        </div>
        <div className='w-full'>
  <h1 className='m-3'>Phone Number</h1>
  <div className='w-full flex flex-row items-center gap-2'>
    <input
      type="number"
      className='bg-white text-black w-[70px] md:w-[99px] h-[51px] rounded-lg text-center'
      placeholder='+91' value={91}
     />
    <input
      type="number"
      className='bg-white text-black rounded w-full md:w-[300px] h-[51px]'
      value={mobile} onChange={(e) => setmobile(e.target.value)}
      maxLength={10}
      minLength={10}
      placeholder="Number"
    />
  </div>
        <p className='h-[20px]'></p>
        </div>
        <div className='w-full'>
          <select className='bg-white text-black h-[51px] w-full md:w-[410px] rounded-lg' name="" id="" value={department} onChange={(e)=> setdepartment(e.target.value)} >
          <option>Select option</option>
          <option>HR</option>
          <option>devlopar</option>
          <option>UI/UX</option>

          </select>
        </div>
        <div className='w-full'>
        <h1 className='m-3'>Password</h1>
        <input type="Password" className='bg-white text-black h-[51px] w-full md:w-[410px] rounded-lg'  value={password} onChange={(e) => setpassword(e.target.value)} placeholder="********"/>
        <p className='h-[20px]'></p>
        </div>
        <div className='w-full' >
          <button className='w-full md:w-[411px] h-[51px] bg-green-500 rounded-lg' onClick={handalsubmition} >Sign Up</button>
        </div>
        <div>
          <p>Already a member? <Link>Login </Link></p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Sign_up