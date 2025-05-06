import { Link, Outlet, useLocation } from 'react-router-dom';

function Tasks() {
  const location = useLocation();
  const isAddTodo = location.pathname.endsWith('addtodo'); // Updated path

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-900 text-white px-4 py-8 pt-24">
      <div className="w-full max-w-4xl">
        <div className="flex rounded-xl overflow-hidden shadow-lg mb-8">
          <Link
            to="/task"
            className={`w-1/2 py-3 text-center text-lg font-semibold transition-all duration-300 ${
              !isAddTodo
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 hover:bg-gray-700 border border-white'
            }`}
          >
            ALL TASKS
          </Link>
          <Link
            to="/task/addtodo"
            className={`w-1/2 py-3 text-center text-lg font-semibold transition-all duration-300 ${
              isAddTodo
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 hover:bg-gray-700 border border-white'
            }`}
          >
            ADD TODO
          </Link>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-md min-h-[300px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
