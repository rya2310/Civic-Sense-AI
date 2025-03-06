import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DepartmentPerformance = ({ data }) => {
  // Calculate resolution rate for each department
  const chartData = data.map(dept => ({
    name: dept.name,
    resolutionRate: Math.round((dept.resolved / dept.total) * 100),
  }));

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Performance</h3>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Resolution Rate']}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Bar dataKey="resolutionRate" fill="#4caf50" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentPerformance;
