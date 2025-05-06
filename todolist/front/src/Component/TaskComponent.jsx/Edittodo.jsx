import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Edittodo() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const condition_obj = { _id: _id };
    axios.get('http://localhost:3000/todo/fetch', { params: condition_obj })
      .then(res => {
        const data = res.data[0];
        setTitle(data.title);
        setDescription(data.description);
        setPriority(data.priority);
        setDeadline(data.deadline);
        setStatus(data.status);
      })
      .catch(err => {
        console.log(err);
      });
  }, [_id]);

  const handleSubmit = () => {
    let todo = {"condition_obj":_id,"content_obj": {"title" :title,"description": description,"deadline": deadline,"status": status,"priority":priority}};
    console.log(todo);
    axios.patch('http://localhost:3000/todo/edit',todo)
      .then(() => {
        navigate('/task')
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white px-4 py-8">
      <form className="bg-gray-800 p-8 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Todo</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          rows="3"
        />

        <select
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        >
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="date"
          name="deadline"
          value={deadline?.split('T')[0]}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
        >
          Update Todo
        </button>
      </form>
    </div>
  );
}

export default Edittodo;
