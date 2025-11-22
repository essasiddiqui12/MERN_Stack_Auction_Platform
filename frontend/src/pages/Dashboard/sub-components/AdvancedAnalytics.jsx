import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdvancedAnalytics = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);
  const { totalAuctioneers, totalBidders } = useSelector((state) => state.superAdmin);

  // Prepare data for Revenue Trend
  const revenueTrendData = {
    labels: monthlyRevenue.map(item => item.month),
    datasets: [{
      label: 'Monthly Revenue',
      data: monthlyRevenue.map(item => item.total),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }]
  };

  // Prepare data for User Distribution
  const userDistributionData = {
    labels: ['Auctioneers', 'Bidders'],
    datasets: [{
      data: [totalAuctioneers.length, totalBidders.length],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    }]
  };

  // Common chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(229, 231, 235)' // text-gray-200
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: 'rgb(229, 231, 235)' // text-gray-200
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.1)' // text-gray-200 with opacity
        }
      },
      x: {
        ticks: {
          color: 'rgb(229, 231, 235)' // text-gray-200
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.1)' // text-gray-200 with opacity
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Revenue Trend Chart */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
        <h3 className="text-xl font-semibold mb-4 text-white">Revenue Trend</h3>
        <div className="h-[300px]">
          <Line data={revenueTrendData} options={options} />
        </div>
      </div>

      {/* User Distribution Chart */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
        <h3 className="text-xl font-semibold mb-4 text-white">User Distribution</h3>
        <div className="h-[300px]">
          <Doughnut 
            data={userDistributionData} 
            options={{
              ...options,
              cutout: '60%',
            }} 
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
        <h3 className="text-xl font-semibold mb-4 text-white">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg">
            <p className="text-gray-300 text-sm">Total Users</p>
            <p className="text-2xl font-bold text-white">
              {totalAuctioneers.length + totalBidders.length}
            </p>
          </div>
          <div className="p-4 bg-purple-900/30 rounded-lg">
            <p className="text-gray-300 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-white">
              ₹{monthlyRevenue.reduce((acc, curr) => acc + curr.total, 0)}
            </p>
          </div>
          <div className="p-4 bg-blue-900/30 rounded-lg">
            <p className="text-gray-300 text-sm">Active Auctioneers</p>
            <p className="text-2xl font-bold text-white">{totalAuctioneers.length}</p>
          </div>
          <div className="p-4 bg-green-900/30 rounded-lg">
            <p className="text-gray-300 text-sm">Active Bidders</p>
            <p className="text-2xl font-bold text-white">{totalBidders.length}</p>
          </div>
        </div>
      </div>

      {/* Growth Indicators */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
        <h3 className="text-xl font-semibold mb-4 text-white">Platform Growth</h3>
        <div className="h-[300px]">
          <Bar 
            data={{
              labels: monthlyRevenue.map(item => item.month),
              datasets: [{
                label: 'Monthly Growth',
                data: monthlyRevenue.map((item, index, arr) => {
                  if (index === 0) return 0;
                  const prevRevenue = arr[index - 1].total;
                  return ((item.total - prevRevenue) / prevRevenue) * 100;
                }),
                backgroundColor: 'rgba(147, 51, 234, 0.5)', // purple-600
                borderColor: 'rgb(147, 51, 234)',
                borderWidth: 1,
              }]
            }}
            options={{
              ...options,
              plugins: {
                ...options.plugins,
                title: {
                  display: true,
                  text: 'Month-over-Month Growth (%)',
                  color: 'rgb(229, 231, 235)'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics; 