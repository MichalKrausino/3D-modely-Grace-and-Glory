import React from 'react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <nav>
            <a href="/add-task" className="text-sm font-medium text-gray-500 hover:text-gray-700 ml-4">Add Task</a>
            <a href="/stats" className="text-sm font-medium text-gray-500 hover:text-gray-700 ml-4">Stats</a>
          </nav>
        </div>
      </header>
      <main className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;