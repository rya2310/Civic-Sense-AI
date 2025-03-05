import { format, subDays } from 'date-fns';

// Generate mock complaints
export const complaints = Array.from({ length: 50 }, (_, i) => {
  const priorities = ['low', 'medium', 'high', 'critical'];
  const statuses = ['pending', 'in-progress', 'escalated', 'resolved'];
  const sources = ['twitter', 'facebook', 'government-portal', 'email', 'sms', 'other'];
  const departments = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Safety', 'Healthcare'];
  
  const createdDate = subDays(new Date(), Math.floor(Math.random() * 30));
  const updatedDate = new Date(createdDate.getTime() + Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000);
  
  return {
    id: `COMP-${1000 + i}`,
    title: `Complaint about ${departments[Math.floor(Math.random() * departments.length)].toLowerCase()}`,
    description: `This is a sample complaint description for issue #${i + 1}. It details problems with local infrastructure or services.`,
    department: departments[Math.floor(Math.random() * departments.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: createdDate.toISOString(),
    updatedAt: updatedDate.toISOString(),
    source: sources[Math.floor(Math.random() * sources.length)],
    location: ['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'][Math.floor(Math.random() * 5)],
    assignedTo: ['Officer Singh', 'Officer Patel', 'Officer Kumar', 'Officer Sharma'][Math.floor(Math.random() * 4)],
    escalationLevel: Math.floor(Math.random() * 3),
    sentimentScore: Math.random() * -1 - 0.2, // Negative sentiment scores for complaints
  };
});

// Department statistics
export const departmentStats = [
  { name: 'Water Supply', total: 120, resolved: 78, pending: 42 },
  { name: 'Electricity', total: 95, resolved: 62, pending: 33 },
  { name: 'Roads', total: 85, resolved: 40, pending: 45 },
  { name: 'Sanitation', total: 110, resolved: 75, pending: 35 },
  { name: 'Public Safety', total: 65, resolved: 30, pending: 35 },
  { name: 'Healthcare', total: 75, resolved: 45, pending: 30 },
];

// Trend data for the last 14 days
export const trendData = Array.from({ length: 14 }, (_, i) => {
  const date = subDays(new Date(), 13 - i);
  return {
    date: format(date, 'MMM dd'),
    complaints: Math.floor(Math.random() * 20) + 10,
    resolved: Math.floor(Math.random() * 15) + 5,
  };
});

// Priority distribution
export const priorityDistribution = [
  { name: 'Low', value: 25, color: '#8bc34a' },
  { name: 'Medium', value: 35, color: '#ffc107' },
  { name: 'High', value: 30, color: '#ff9800' },
  { name: 'Critical', value: 10, color: '#f44336' },
];

// Resolution time by department (in days)
export const resolutionTime = [
  { name: 'Water Supply', time: 3.2 },
  { name: 'Electricity', time: 2.5 },
  { name: 'Roads', time: 5.7 },
  { name: 'Sanitation', time: 2.8 },
  { name: 'Public Safety', time: 1.9 },
  { name: 'Healthcare', time: 4.1 },
];

// Escalation statistics
export const escalationStats = {
  total: 215,
  escalated: 45,
  escalationRate: '20.9%',
  byLevel: [
    { level: 'Level 1', count: 25 },
    { level: 'Level 2', count: 15 },
    { level: 'Level 3', count: 5 },
  ],
};
