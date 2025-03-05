import React, { useState } from 'react';
import Header from './Header';
import StatCard from './StatCard';
import ComplaintsList from './ComplaintsList';
import DepartmentPerformance from './DepartmentPerformance';
import ComplaintTrends from './ComplaintTrends';
import PriorityDistribution from './PriorityDistribution';
import EscalationStats from './EscalationStats';
import { 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle, 
  Clock
} from 'lucide-react';

import { 
  complaints, 
  departmentStats, 
  trendData, 
  priorityDistribution,
  escalationStats
} from '../data/mockData';



const Dashboard = () => {
  // Calculate summary statistics
  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length;
  const pendingComplaints = complaints.filter(c => c.status === 'pending').length;
  const escalatedComplaints = complaints.filter(c => c.status === 'escalated').length;
  const criticalComplaints = complaints.filter(c => c.priority === 'critical').length;

  const {user,setUser}=useState(null);

  return (
    <div className="flex-1 overflow-auto">
      <Header />
      
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="Total Complaints" 
            value={totalComplaints} 
            icon={<MessageSquare className="h-6 w-6 text-[#10B981]" />}
            change="+12% from last month"
            positive={false}
          />
          <StatCard 
            title="Resolved" 
            value={resolvedComplaints} 
            icon={<CheckCircle className="h-6 w-6 text-[#10B981]" />}
            change="+8% from last month"
            positive={true}
          />
          <StatCard 
            title="Pending" 
            value={pendingComplaints} 
            icon={<Clock className="h-6 w-6 text-[#10B981]" />}
            change="-5% from last month"
            positive={true}
          />
          <StatCard 
            title="Critical Issues" 
            value={criticalComplaints} 
            icon={<AlertTriangle className="h-6 w-6 text-[#10B981]" />}
            change="+2% from last month"
            positive={false}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ComplaintTrends data={trendData} />
          <DepartmentPerformance data={departmentStats} />
        </div>
        
        <div className="mb-6">
          <ComplaintsList complaints={complaints} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PriorityDistribution data={priorityDistribution} />
          <EscalationStats {...escalationStats} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
