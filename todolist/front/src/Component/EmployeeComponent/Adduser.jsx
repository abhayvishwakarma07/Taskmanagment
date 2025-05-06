import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Adduser() {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [mobile, setmobile] = useState('');
    const [department, setdepartment] = useState('');
    const [emailerror, setemailerror] = useState('');
    const [error, seterror] = useState('');

    const handalsubmition = () => {
        if (!name) return seterror("Name is required");
        if (!email) return seterror("Email is required");
        if (!mobile) return seterror("Mobile is required");
        if (!department) return seterror("Department is required");

        setTimeout(() => seterror(''), 3000);

        const userDetails = { "name":name,"email": email,"movile":mobile,"department": department };

        axios.post('http://localhost:3000/user/save', userDetails).then((res) => {
            alert("User added successfully");
            setemail('');
            setname('');
            setmobile('');
            setdepartment('');
        }).catch((err) => {
            const error = err.response?.data?.error?.errors;
            if (error?.email) {
                setemailerror('This email already exists');
                setTimeout(() => setemailerror(''), 3000);
                setemail('');
                setname('');
                setmobile('');
                setdepartment('');
            }
        });
    };

    return (
        <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl shadow-lg">
            {error && <h2 className="text-red-500 text-center mb-4">{error}</h2>}
            <h1 className="text-white text-2xl font-bold text-center mb-6">Add User</h1>

            <div className="mb-4">
                <label className="text-gray-300 block mb-1">Full Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <div className="mb-4">
                <label className="text-gray-300 block mb-1">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {emailerror && <p className="text-red-500 text-sm mt-1">{emailerror}</p>}
            </div>

            <div className="mb-4">
                <label className="text-gray-300 block mb-1">Phone Number:</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value="+91"
                        readOnly
                        className="w-16 p-2 bg-gray-800 text-white border border-gray-600 rounded text-center"
                    />
                    <input
                        type="number"
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                        className="flex-1 p-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="text-gray-300 block mb-1">Department:</label>
                <select
                    value={department}
                    onChange={(e) => setdepartment(e.target.value)}
                    className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">Select option</option>
                    <option value="HR">HR</option>
                    <option value="Developer">Developer</option>
                    <option value="UI/UX">UI/UX</option>
                </select>
            </div>

            <button
                onClick={handalsubmition}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
                Add User
            </button>
        </div>
    );
}

export default Adduser;
