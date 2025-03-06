import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import StatCard from './StatCard';
import ComplaintsList from './ComplaintsList';
import DepartmentPerformance from './DepartmentPerformance';
import ComplaintTrends from './ComplaintTrends';
import PriorityDistribution from './PriorityDistribution';
import EscalationStats from './EscalationStats';
import { MessageSquare, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

import { trendData, departmentStats, priorityDistribution, escalationStats } from '../data/mockData';
import Complaint from '../../../backend/model/complaint_Model';

const Dashboard = () => {
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [resolvedComplaints, setResolvedComplaints] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);
  const [criticalComplaints, setCriticalComplaints] = useState(0);
  const [recentComplaints, setRecentComplaints] = useState([]);

  const BASE_URL=import.meta.env.VITE_BASE_URL;
  // Fetch complaints data from API
  useEffect(() => {
    const fetchComplaintsData = async () => {
      try {
        const [totalRes, resolvedRes, pendingRes, criticalRes, recentRes] = await Promise.all([
          axios.get(`${BASE_URL}/count-complaints`),
          axios.get(`${BASE_URL}/resolved-count`),
          axios.get(`${BASE_URL}/pending-count`),
          axios.get(`${BASE_URL}/critical-count`),
          axios.get(`${BASE_URL}/recent-complaints`)
        ]);
  
        console.log("Total Complaints Response:", totalRes.data);
        console.log("Resolved Complaints Response:", resolvedRes.data);
        console.log("Pending Complaints Response:", pendingRes.data);
        console.log("Critical Complaints Response:", criticalRes.data);
        console.log("Recent Complaints Response:", recentRes.data);
  
        setTotalComplaints(totalRes.data.count || 0);
        setResolvedComplaints(resolvedRes.data.count || 0);
        setPendingComplaints(pendingRes.data.count || 0);
        setCriticalComplaints(criticalRes.data.count || 0);
        setRecentComplaints(recentRes.data || []);
      } catch (error) {
        console.error('Error fetching complaints data:', error);
      }
    };
  
    fetchComplaintsData();
  }, []);


  return (
    <div className="flex-1 overflow-auto">
      <Header />
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="Total Complaints" 
            value={totalComplaints} 
            icon={<MessageSquare className="h-6 w-6 text-[#EF4444]" />} 
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
            icon={<Clock className="h-6 w-6 text-[#FACC15]" />} 
            change="-5% from last month"
            positive={true}
          />
          <StatCard 
            title="High Issues" 
            value={criticalComplaints} 
            icon={<AlertTriangle className="h-6 w-6 text-[#DC2626]" />} 
            change="+2% from last month"
            positive={false}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ComplaintTrends data={trendData} />
          <DepartmentPerformance data={departmentStats} />
        </div>

        <div className="mb-6">
          <ComplaintsList complaints={recentComplaints} /> 
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
