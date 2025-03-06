import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard';
import { complaints } from './data/mockData';
import ComplaintForm from './components/ComplaintForm.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import SignInForm from './components/SignInForm.jsx';
import AllComps from './components/AllComps.jsx';
import Official from './components/official.jsx';
import Chatbot from './components/Chatbot.jsx'; // Import Chatbot

function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      {children}
    </div>
  );
}

function MainLayout({ children, showChatbot = false }) {
  return (
    <div className="flex h-screen bg-background-light">
      <Sidebar />
      <div className="flex-grow relative">
        {children}
        {showChatbot && <Chatbot />} {/* Chatbot only for Dashboard */}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes (No Sidebar) */}
        <Route path="/register" element={<AuthLayout><SignUpForm /></AuthLayout>} />
        <Route path="/login" element={<AuthLayout><SignInForm /></AuthLayout>} />

        {/* Main App Routes (With Sidebar) */}
        <Route path="/" element={<MainLayout showChatbot={true}><Dashboard /></MainLayout>} />
        <Route path="/complaints" element={<MainLayout><AllComps complaints={complaints} /></MainLayout>} />
        <Route path="/officials" element={<MainLayout><Official /></MainLayout>} />
        <Route path="/new-complaint" element={<MainLayout><ComplaintForm /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
