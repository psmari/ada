import React from 'react'

const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <h1 className="text-3xl font-bold text-black">
            Dashboard
          </h1>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
