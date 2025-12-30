import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

/* REQUIRED REGISTRATION */
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const SalesChart = ({ conversionTrend = [] }) => {
  // Past 2 weeks (14 days)
  const labels = [
    "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
    "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
  ];

  const data = {
    labels,
    datasets: [
      {
        data:
          conversionTrend && conversionTrend.length
            ? conversionTrend.slice(-14)
            : Array(14).fill(0),
        backgroundColor: "#D9D9D9",
        borderRadius: 8,
        barThickness: 14,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (v) => `${v}%`,
          color: "#616161",
          font: { size: 12 },
        },
        grid: {
          borderDash: [4, 4],
          color: "#E5E5E5",
        },
        border: { display: false },
      },
      x: {
        ticks: {
          color: "#616161",
          font: { size: 12 },
        },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div style={{ height: "190px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesChart;
