import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setNavbar(!!token);
    };

    checkToken();
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <div className="text-2xl font-bold">
          <Link to="/">
            todo-<span className="text-green-500">list</span>
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <div className="hidden md:flex gap-10 font-semibold text-lg items-center">
          {navbar ? (
            <>
              <Link to="/employees" className="hover:text-green-400">Employees</Link>
              <Link to="/task" className="hover:text-green-400">Tasks</Link>
              <Link to="/logout" className="bg-green-500 hover:bg-green-400 text-white py-1 px-4 rounded-lg">Logout</Link>
            </>
          ) : (
            <Link to="/login" className="bg-green-500 hover:bg-green-400 text-white py-1 px-4 rounded-lg">Login</Link>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-700 px-4 pb-4 space-y-3 text-lg font-medium">
          {navbar ? (
            <>
              <Link to="/employees" onClick={() => setMenuOpen(false)} className="block hover:text-green-400">Employees</Link>
              <Link to="/task" onClick={() => setMenuOpen(false)} className="block hover:text-green-400">Tasks</Link>
              <Link to="/logout" onClick={() => setMenuOpen(false)} className="block bg-green-500 hover:bg-green-400 text-white py-1 px-4 rounded-lg w-fit">Logout</Link>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block bg-green-500 hover:bg-green-400 text-white py-1 px-4 rounded-lg w-fit">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
