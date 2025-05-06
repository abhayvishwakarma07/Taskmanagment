import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';

function Alltodo() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const condition_obj = { user: localStorage.getItem('email') };

    axios.get('http://localhost:3000/todo/fetch', {
      params: { condition_obj }
    }).then((response) => {
      setTodo(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const deleteTodo = (_id) => {
    axios.post('http://localhost:3000/todo/delete', { _id })
      .then(() => {
        setTodo(prev => prev.filter(item => item._id !== _id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-400">Your Todos</h2>

        {todo.length > 0 ? (
          todo.map((data) => (
            <div
              key={data._id}
              className="border-b border-gray-700 pb-6 mb-6"
            >
              <div className="flex justify-between items-start">
                <div>
                <h3 className="text-2xl font-semibold text-green-300 mb-1 uppercase">{data.title}</h3>

                  <p className="text-gray-300 mb-3">{data.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-400 mt-4">
                    <div>
                      <span className="block font-semibold text-white">Priority:</span>
                      <span className="capitalize">{data.priority}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-white">Deadline:</span>
                      <span>{data.deadline}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-white">Status:</span>
                      <span className="capitalize">{data.status}</span>
                    </div>
                    <div className="bg-gray-800 px-3 py-2 rounded-md border border-blue-400">
                      <span className="block font-semibold text-blue-400">Employee:</span>
                      <span className="capitalize text-white font-bold">{data.employee}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-1">
                  <Link to={`edittodo/${data._id}`}>
                    <button
                      title="Edit"
                      className="text-yellow-400 hover:text-yellow-300 text-2xl"
                    >
                      <MdEdit />
                    </button>
                  </Link>
                  <button
                    title="Delete"
                    className="text-red-500 hover:text-red-400 text-2xl"
                    onClick={() => deleteTodo(data._id)}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-20">
            <h1 className="text-3xl text-green-500 font-semibold">No Todos Available</h1>
            <p className="text-gray-400 mt-2">Start by adding a new todo!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Alltodo;
