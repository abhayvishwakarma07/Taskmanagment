import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Log_in() {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');

  const handalsumit = () => {
    if (!email) return seterror('Email is required');
    if (!password) return seterror('Password is required');

    const userDetails = { email, password };

    axios.post('http://localhost:3000/admin/login', userDetails)
      .then((res) => {
        alert("Login successful");
        const user = res.data.user;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);
        navigate("/");
      })
      .catch((err) => {
        const res = err.response;
        if (res?.status === 404) {
          seterror("User not found");
        } else if (res?.status === 401) {
          seterror("Incorrect password");
        } else {
          seterror("Login failed");
        }
        setTimeout(() => seterror(''), 3000);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1">Email or Mobile</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="button"
            onClick={handalsumit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Not a member?{' '}
          <Link to="/Sign_up" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Log_in;
