import { useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Flag,
  Bike,
  Tag,
  DollarSign,
  CalendarDays,
  Award,
  FileText,
  Image as ImageIcon,
  ListTodo,
  Settings,
  FileCode,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

// Import Admin Components
import UserManagement from './admin/UserManagement';
import RiderManagement from './admin/RiderManagement';
import NationalityManagement from './admin/NationalityManagement';
import CategoryManagement from './admin/CategoryManagement';
import EventManagement from './admin/EventManagement';
import PointManagement from './admin/PointManagement';
import CalendarManagement from './admin/CalendarManagement';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">Total Users</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">Active Events</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">$45,678</p>
        </div>
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">Active Riders</h3>
          <p className="text-3xl font-bold">890</p>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      items: [
        { name: "Overview", path: "/admin" }
      ]
    },
    {
      title: "Master",
      icon: <Settings size={20} />,
      items: [
        { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
        { name: "Riders", path: "/admin/riders", icon: <Bike size={20} /> },
        { name: "Nationalities", path: "/admin/nationalities", icon: <Flag size={20} /> },
        { name: "Categories", path: "/admin/categories", icon: <Tag size={20} /> }
      ]
    },
    {
      title: "Transaction",
      icon: <DollarSign size={20} />,
      items: [
        { name: "Events", path: "/admin/events", icon: <CalendarDays size={20} /> },
        { name: "Points", path: "/admin/points", icon: <Award size={20} /> },
        { name: "Calendar", path: "/admin/calendar", icon: <CalendarDays size={20} /> }
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-dark-400">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-dark-300 border-r border-dark-100 transition-all duration-300 fixed h-screen overflow-y-auto z-50`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            {isSidebarOpen ? (
              <img src="/pears-logo.png" alt="PEARS" className="h-8" />
            ) : (
              <img src="/pears-icon.png" alt="" className="h-8 w-8" />
            )}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isSidebarOpen ? <ChevronDown size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className="mb-6">
            <div className="text-sm font-medium text-gray-400 mb-2">Administrator</div>
            <div className="text-white font-bold">{user?.email}</div>
          </div>

          <nav>
            {menuItems.map((section, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex items-center text-gray-400 mb-2 px-2">
                  {section.icon}
                  {isSidebarOpen && (
                    <span className="ml-3 text-sm font-medium">{section.title}</span>
                  )}
                </div>
                <ul>
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        to={item.path}
                        className={`flex items-center px-2 py-2 text-sm rounded-lg mb-1
                          ${isActive(item.path)
                            ? 'bg-accent-primary text-white'
                            : 'text-gray-400 hover:bg-dark-200'
                          }`}
                      >
                        {item.icon && (
                          <span className="w-5 h-5 mr-2">{item.icon}</span>
                        )}
                        {isSidebarOpen && (
                          <span>{item.name}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Navigation */}
        <header className="bg-dark-300 border-b border-dark-100">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-bold text-white">PEARS Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="text-gray-400 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="h-[calc(100vh-4rem)] overflow-y-auto">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="riders" element={<RiderManagement />} />
            <Route path="nationalities" element={<NationalityManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="points" element={<PointManagement />} />
            <Route path="calendar" element={<CalendarManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Admin;