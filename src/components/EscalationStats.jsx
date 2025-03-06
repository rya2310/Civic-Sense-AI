import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EscalationStats = ({ total, escalated, escalationRate, byLevel }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Escalation Statistics</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-secondary-light rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Complaints</p>
          <p className="text-xl font-bold">{total}</p>
        </div>
        <div className="bg-secondary-light rounded-lg p-4">
          <p className="text-sm text-gray-500">Escalated</p>
          <p className="text-xl font-bold">{escalated}</p>
        </div>
        <div className="bg-secondary-light rounded-lg p-4">
          <p className="text-sm text-gray-500">Escalation Rate</p>
          <p className="text-xl font-bold">{escalationRate}</p>
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={byLevel}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Bar dataKey="count" fill="#ff9800" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EscalationStats;
