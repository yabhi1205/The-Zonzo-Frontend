"use client"
// Inside src/components/Dashboard.js

import React from "react";

function Dashboard() {
  
  // Dummy data for the tables
  const tableData = [
    { category: "Category A", value: 120, percentage: "30%" },
    { category: "Category B", value: 80, percentage: "20%" },
    { category: "Category C", value: 60, percentage: "15%" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold dark:text-gray-800 text-white mb-4">
        Dashboard
      </h1>

      

      {/* Analytics Tables */}
      <div className="mt-8">
        <h2 className="text-2xl font-medium dark:text-gray-800 text-white mb-4">
          Analytics Tables
        </h2>
        <table className="min-w-full divide-y dark:divide-gray-200 divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.percentage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
