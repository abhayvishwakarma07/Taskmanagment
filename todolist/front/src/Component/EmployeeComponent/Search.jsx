import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/user/fetch')
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  },);

  const deleteuser = (_id) => {
    axios.delete('http://localhost:3000/user/delete', {
      data: { _id: _id }
    })
    .then((res) => {
      console.log("User deleted");
      setUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
          User Search
        </h1>

        <input
          type="text"
          placeholder="Search by name..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredUsers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition hover:shadow-xl"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Email: {user.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Mobile: {user.mobile}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Department: {user.department}</p>

                <div className="mt-4 flex gap-4">
                  <Link to={`edituser/${user._id}`} ><button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
                    Edit
                  </button></Link>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded" onClick={()=>{deleteuser(user._id)}}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
