import React, { useState ,useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navbar() { 
    
  const [navabar,setnavbar]=useState('');
   
  let nav = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    let value = window.scrollY;
    if (value > 50) {
      nav.classList.add('bg-black');
    } else {
      nav.classList.remove('bg-black');
    }
  });
  
  useEffect(() => {
    setInterval(() => {
      

    if(localStorage.getItem("token")!=undefined && localStorage.getItem("role") =="user"){
      setnavbar(<div className='flex font-bold gap-10 text-lg'>
                <button className='bg-green-500 rounded-lg justify-center py-1 px-3 '><Link to='/addtodo'> Add todo </Link></button>
                <button className='bg-green-500 rounded-lg justify-center py-1 px-3 '><Link to='/todos'> todos </Link></button>
                <button className='bg-green-500 rounded-lg justify-center py-1 px-3 '><Link to='/logout'>logout</Link> </button>
                </div>)
  }
 else if(localStorage.getItem("token")!=undefined && localStorage.getItem("role") =="admin"){

    setnavbar(<div className='flex font-bold gap-10 text-lg'>
              <button className='bg-green-500 rounded-lg justify-center py-1 px-3 '><Link to='/userlist'>UserList </Link></button>
              <button className='bg-green-500 rounded-lg justify-center py-1 px-3 '><Link to='/logout'>logout</Link> </button>
              </div>)
}
  else {
    setnavbar(<div className='flex font-bold gap-10 text-lg'>
  <button className='bg-green-500 rounded-lg justify-center py-1 px-3 '><Link to='/login'>login</Link></button>
  </div>)
  }
},);
  }, [])
  
  

  

  return (
    <section>
        <nav id='navbar' className='flex justify-around fixed h-20 items-center w-screen top-0'>
            <div className='font-bold text-2xl'><Link to='/'>todo-<span className='text-green-500'>list</span></Link></div>
            {navabar}
           </nav>
    </section>
  )
}

export default Navbar