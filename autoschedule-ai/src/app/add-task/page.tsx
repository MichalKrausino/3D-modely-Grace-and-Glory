import React from 'react';

const AddTaskPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Add Task</h1>
          <nav>
            <a href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-700 ml-4">Dashboard</a>
            <a href="/stats" className="text-sm font-medium text-gray-500 hover:text-gray-700 ml-4">Stats</a>
          </nav>
        </div>
      </header>
      <main className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4">
                <h2 className="text-lg font-bold text-gray-800">New Task</h2>
                <form className="mt-4">
                  <div>
                    <label htmlFor="task-name" className="block text-sm font-medium text-gray-700">Task Name</label>
                    <input type="text" id="task-name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm" />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                    <input type="number" id="duration" defaultValue="60" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm" />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                    <input type="datetime-local" id="deadline" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm" />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" id="category" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm" />
                  </div>
                  <div className="mt-6">
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500" style={{ backgroundColor: '#AEA13A' }}>
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddTaskPage;