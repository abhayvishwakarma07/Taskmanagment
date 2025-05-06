import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDeleteForever } from "react-icons/md";

function Alltodo() {
    const [todo,settodo]=useState([]); 

    useEffect(() => {
       const condition_obj={"user":localStorage.getItem('email')};
       console.log(condition_obj);
        axios.get('http://localhost:3000/todo/fetch',{
            params:{"condition_obj": condition_obj}}
              ).then((response)=>{
                settodo(response.data);
          }).catch((error)=>{
            console.log(error);
          })  
    },1000)

        const tododelete=(_id)=>{
            const todo={"_id":_id};
            axios.post('http://localhost:3000/todo/delete',todo).then((res)=>{
                console.log(res) 
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
          }

  return (
    <>
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-96 min-h-96'>
        {
           todo.length>0 ?todo.map((data)=>(
            
                    <div className='w-96 ' key={data._id}>
                        <h2 className='font-bold '>{data.title}</h2>
                        <p className='bg-white text-black rounded-2xl h-12 flex items-center'>{data.description}</p>
                        <button className='relative bottom-10 left-80 text-black' onClick={()=>(tododelete(data._id))} >< MdDeleteForever className='text-3xl'/></button>
                    </div>
                )):<div>
                    <h1 className='text-green-500 text-5xl'>No todo avilable</h1>
                </div>
            }
        </div>
    </div>
    </>
  )
}

export default Alltodo