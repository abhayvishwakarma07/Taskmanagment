import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sign_up() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [mobile, setmobile] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [error, seterror] = useState('');

  const handalsubmition = () => {
    if (!name) return seterror("Name is required");
    if (!email) return seterror("Email is required");
    if (!password) return seterror("Password is required");
    if (!mobile) return seterror("Mobile is required");

    setTimeout(() => seterror(''), 3000);

    const userDetails = { "name":name,"email": email,"mobile": mobile,"password": password};
    console.log(userDetails);
    axios.post('http://localhost:3000/admin/save', userDetails)
      .then(() => {
        alert("Registration successful");
        setname('');
        setemail('');
        setmobile('');
        setpassword('');
        navigate('/login');
      })
      .catch((err) => {
        const errors = err.response?.data?.error?.errors;
        if (errors?.email) {
          setemailerror('This email already exists');
          setTimeout(() => setemailerror(''), 3000);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-5 mt-24">
      <div className="bg-gray-800 shadow-lg rounded-xl w-full max-w-md p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        <label className="block mb-2">Full Name</label>
        <input
          type="text"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="w-full mb-1 p-3 rounded-lg bg-gray-700 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        {emailerror && <p className="text-red-500 mb-2">{emailerror}</p>}

        <label className="block mb-2">Phone Number</label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="w-[70px] p-3 rounded-lg bg-gray-700 text-white text-center"
            value="+91"
            disabled
          />
          <input
            type="number"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            placeholder="Phone number"
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
          />
        </div>
        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white"
          placeholder="********"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />

        <button
          onClick={handalsubmition}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-lg transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-center mt-4">
          Already a member? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Sign_up;
