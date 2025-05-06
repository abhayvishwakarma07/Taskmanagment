import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Addtodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Pending');
  const [assignedTo, setAssignedTo] = useState('');
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/user/fetch')
      .then(response => {
        setUserList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = ()=> {

    if (!title) return setError("Title is required");
    if (!description) return setError("Description is required");
     
    const taskdetails={"title":title,"description":description,"priority":priority,"status":status,"deadline":deadline,"employee":assignedTo}

    axios.post('http://localhost:3000/todo/save',taskdetails)
      .then(() => {
        alert("Todo successfully added");
        setTitle('');
        setDescription('');
        setPriority('Low');
        setDeadline('');
        setStatus('Pending');
        setAssignedTo('');
        setError('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4 pt-24">
      <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Create New Task</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-5" >
          <div>
            <label className="block mb-1 font-semibold text-gray-300">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task..."
              rows={3}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-300">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-300">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-300">Assign To</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select user</option>
              {userList.map((user) => (
                <option key={user._id} value={user.email}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
            type='button'
            onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addtodo;
