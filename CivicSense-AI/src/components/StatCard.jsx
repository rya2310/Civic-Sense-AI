import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  positive = true,
  bgColor = 'bg-white'
}) => {
  return (
    <div className={`${bgColor} rounded-lg shadow p-6`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-primary-light">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

