import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
     const navigate=useNavigate();
   useEffect(() => {  
    localStorage.clear("token");
    localStorage.clear("name");
    localStorage.clear("email");
    localStorage.clear("role");
    navigate('/login');
   }, [])
}

export default Logout