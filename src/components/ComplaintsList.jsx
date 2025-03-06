import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight } from 'lucide-react';

const ComplaintsList = ({ complaints }) => {
  const getPriorityBadge = (priority) => {
    const classes = {
      Low: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${classes[priority] || 'bg-gray-100 text-gray-800'}`}>
        {priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : 'Unknown'}
      </span>
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Progressing':
        return <ArrowUpRight className="h-5 w-5 text-blue-500" />;
      case 'Escalated':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'Resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Recent Complaints</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.slice(0, 5).map((complaint) => (
              <tr key={complaint._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {complaint._id ? complaint._id.slice(-5) : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="max-w-xs truncate">{complaint.complaintDescription || 'No description'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {complaint.department || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPriorityBadge(complaint.priority)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(complaint.status)}
                    <span className="ml-2 text-sm text-gray-700">
                      {complaint.status 
                        ? complaint.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                        : 'Unknown'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {complaint.createdAt ? format(new Date(complaint.createdAt), 'MMM dd, yyyy') : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <a href="#" className="text-[#10B981] font-medium text-sm hover:underline">View all complaints</a>
      </div>
    </div>
  );
};

export default ComplaintsList;
