import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
  const [dashboard, setDashboard] = useState(null);
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/todo/fetch')
      .then((response) => {
        console.log(response.data)
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:3000/user/fetch')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const token = localStorage.getItem('token');
  const totalTodos = todos.length;
  const pendingTodos = todos.filter(todo => todo.status === "pending").length;
  const completedTodos = todos.filter(todo => todo.status === "Completed").length;
  const totalUsers = users.length;

  useEffect(() => {
    const checkAuth = () => {
      if (token) {
        setDashboard(
          <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
            <h1 className="text-4xl font-extrabold text-center mb-10 uppercase tracking-wide">Admin Dashboard</h1>

            <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
              <Card title="Total Tasks" value={totalTodos} color="blue" />
              <Card title="Pending Tasks" value={pendingTodos} color="yellow" />
              <Card title="Completed Tasks" value={completedTodos} color="green" />
              <Card title="Total Users" value={totalUsers} color="purple" />
            </div>
          </div>
        );
      } else {
        setDashboard(
          <div className='flex flex-col justify-center items-center gap-5 min-h-screen'>
            <h1 className='font-bold text-3xl text-center w-full'>
              Welcome to the <span className='text-green-500'>AB_SHARMA WEB 2.3</span>
            </h1>
            <p className='text-center max-w-2xl text-gray-600'>
              A simple task management app to track your to-dos efficiently. Sign in to view your dashboard and tasks.
            </p>
            <button className='bg-green-500 p-3 rounded-full font-bold hover:bg-green-400'>Learn More</button>
          </div>
        );
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 5000);
    return () => clearInterval(interval);
  }, [token, totalTodos, pendingTodos, completedTodos, totalUsers]);

  return <>{dashboard}</>;
}

function Card({ title, value, color }) {
  return (
    <div className={`bg-gray-800 rounded-2xl shadow-xl p-8 h-48 flex flex-col justify-center items-center border-t-4 border-${color}-500`}>
      <h2 className="text-xl font-medium text-gray-300 mb-2 uppercase tracking-wide">{title}</h2>
      <p className={`text-6xl font-extrabold text-${color}-400`}>{value}</p>
    </div>
  );
}

export default Home;
