"use client"
// Inside src/components/Dashboard.js

import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

function Dashboard() {
  // Dummy data for the charts
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Visitors",
        data: [50, 40, 60, 30, 70, 50],
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
    ],
  };

  const pieData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Votes",
        data: [33, 33, 34],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
          <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
            Bar Chart
          </h2>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
          <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
            Line Chart
          </h2>
          <Line data={lineData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
          <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
            Pie Chart
          </h2>
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
