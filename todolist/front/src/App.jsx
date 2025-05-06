import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Addtodo from './Component/Addtodo'
import Alltodo from './Component/Alltodo'
import Home from './Component/home'
import Logout from './Component/Logout'
import Log_in from './Component/Log_in'
import Navbar from './Component/Navbar'
import Sign_up from './Component/Sign_up'
import UserList from './Component/UserList'

function App() {

  return (
    <>
    <div>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Log_in/>}/>
      <Route path='/Sign_up'element={<Sign_up/>}/>
      <Route path='/logout'element={<Logout/>}/>
      <Route path='/userlist'element={<UserList/>}/>
      <Route path='/addtodo'element={<Addtodo/>}/>
      <Route path='/todos'element={<Alltodo/>}/>
    </Routes>
  
    </div>
    </>
  )
}

export default App
