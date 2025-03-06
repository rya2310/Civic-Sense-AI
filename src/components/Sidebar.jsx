import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart2,
  Users,
  Settings,
  LogOut,
  BrainCircuit,
} from 'lucide-react';

const Sidebar = () => {
  const [active, setActive] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
  });

  const handleClick = (key) => {
    setActive({
      one: key === 'one',
      two: key === 'two',
      three: key === 'three',
      four: key === 'four',
    });
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="h-8 w-8 text-[#10B981]" aria-label="Civic Sense AI" />
          <h1 className="text-xl font-bold text-gray-800">Civic Sense AI</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">Sentiment Analysis Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/"
              onClick={() => handleClick('one')}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                active['one'] ? 'bg-[#D1FAE5] text-[#10B981]' : 'text-gray-700'
              } font-medium`}
            >
              <LayoutDashboard className="h-5 w-5" aria-label="Dashboard" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/complaints"
              onClick={() => handleClick('two')}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                active['two'] ? 'bg-[#D1FAE5] text-[#10B981]' : 'text-gray-700'
              } font-medium`}
            >
              <MessageSquare className="h-5 w-5" aria-label="Complaints" />
              <span>Complaints</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleClick('three')}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                active['three'] ? 'bg-[#D1FAE5] text-[#10B981]' : 'text-gray-700'
              } font-medium`}
            >
              <BarChart2 className="h-5 w-5" aria-label="Analytics" />
              <span>Analytics</span>
            </a>
          </li>
          <li>
            <Link
              to="/officials"
              onClick={() => handleClick('four')}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                active['four'] ? 'bg-[#D1FAE5] text-[#10B981]' : 'text-gray-700'
              } font-medium`}
            >
              <Users className="h-5 w-5" aria-label="Officials" />
              <span>Officials</span>
            </Link>
          </li>
          <li>
            <Link
              to="/new-complaint"
              className="w-[14rem] flex text-white items-center text-xl font-semibold py-2 mx-auto rounded-xl bg-[#10B981] hover:bg-[#059669] cursor-pointer"
            >
              <p className="text-4xl flex items-center justify-center font-serif font-bold w-[20%] mt-[-4px]">+</p>
              New Complaint
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" aria-label="Settings" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" aria-label="Logout" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;