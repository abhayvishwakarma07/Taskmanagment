import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Addtodo() {
    const [title,settitle]=useState('');
    const [description,setdescription]=useState('')
    const [error,seterror]=useState('');
    const [user,setuser]=useState('');
    const handalsubmit=()=>{
         
        if(!title) return seterror("title is require");
        if(!description) return seterror("description is require");
      
        const todo={"title":title,"description":description ,"user":localStorage.getItem('email')};
        console.log(todo);
        axios.post('http://localhost:3000/todo/save',todo).then((res)=>{
            alert("todo succesffully added");
            settitle('');
            setdescription('');
        }).catch((error)=>{
            console.log(error);
        })
    }

  return (
    <>
    <div className='h-screen w-full flex justify-center items-center'>
        <div className='border-2 w-96 h-96 rounded-2xl flex flex-col p-5 justify-center gap-5'>
            <h1 className='text-center text-green-500 font-bold text-2xl'>ADD TODO</h1>
        <form action="">
            <div className='w-full m-5'>
                <input type="text" className=' text-black bg-white w-[300px] h-[50px] rounded-xl' onChange={(e)=>settitle(e.target.value)} value={title} placeholder="title"/>
            </div>
            <div className='w-full m-5' >
                <input type="text" className='text-black bg-white w-[300px] h-[50px] rounded-xl' onChange={(e)=>setdescription(e.target.value)} value={description} placeholder='discription'/>
            </div>
            <div className='w-full m-5'>
                <button type='button' onClick={handalsubmit} className='bg-green-500 w-[300px] h-[50px] rounded-2xl '><Link to='/todos'> Add todo </Link></button>
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default Addtodo