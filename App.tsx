
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Wallet, 
  UserPlus, 
  BarChart3, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  CheckCircle2
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import Savings from './pages/Savings';
import Registration from './pages/Registration';
import AgentPanel from './pages/AgentPanel';
import ChatAssistant from './pages/ChatAssistant';

const App: React.FC = () => {
  const [activeUser] = useState({
    id: 'USR123',
    name: 'Ahmad Fauzi',
    role: 'agent', // can be jamaah, agent, sub-agent
    email: 'ahmad.fauzi@email.com',
    virtualAccount: '8801 0812 3456 7890',
    balance: 15450000
  });

  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-900">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-emerald-800 text-white fixed h-full shadow-xl">
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-tight text-amber-400">Chatour ID</h1>
            <p className="text-xs text-emerald-200 uppercase tracking-widest mt-1">Tabungan Umroh</p>
          </div>
          
          <nav className="flex-1 px-4 mt-4 space-y-2">
            <NavItem to="/" icon={<Home size={20} />} label="Dashboard" />
            <NavItem to="/savings" icon={<Wallet size={20} />} label="Tabungan Saya" />
            <NavItem to="/registration" icon={<UserPlus size={20} />} label="Daftar Jamaah" />
            {activeUser.role === 'agent' && (
              <NavItem to="/agent" icon={<BarChart3 size={20} />} label="Panel Agen" />
            )}
            <NavItem to="/chat" icon={<MessageSquare size={20} />} label="AI Assistant" />
          </nav>

          <div className="p-4 border-t border-emerald-700/50">
            <div className="flex items-center gap-3 p-2 bg-emerald-900/30 rounded-xl mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-emerald-900 font-bold">
                {activeUser.name.charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">{activeUser.name}</p>
                <p className="text-xs text-emerald-300 capitalize">{activeUser.role}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 w-full p-2 text-emerald-300 hover:text-white transition-colors">
              <LogOut size={18} />
              <span className="text-sm">Keluar</span>
            </button>
          </div>
        </aside>

        {/* Bottom Nav for Mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex justify-around p-3 shadow-lg">
          <MobileNavItem to="/" icon={<Home size={20} />} />
          <MobileNavItem to="/savings" icon={<Wallet size={20} />} />
          <MobileNavItem to="/registration" icon={<UserPlus size={20} />} />
          <MobileNavItem to="/agent" icon={<BarChart3 size={20} />} />
          <MobileNavItem to="/chat" icon={<MessageSquare size={20} />} />
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 pb-20 md:pb-0 min-h-screen">
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold md:hidden text-emerald-800">Chatour ID</h2>
            <div className="hidden md:block">
              <p className="text-sm text-slate-500">Selamat datang kembali,</p>
              <p className="font-semibold">{activeUser.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </header>

          <div className="p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard user={activeUser} />} />
              <Route path="/savings" element={<Savings user={activeUser} />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/agent" element={<AgentPanel user={activeUser} />} />
              <Route path="/chat" element={<ChatAssistant />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive 
          ? 'bg-amber-400 text-emerald-900 font-semibold' 
          : 'hover:bg-emerald-700/50 text-emerald-100'
      }`}
    >
      <span className={`${isActive ? 'text-emerald-900' : 'text-emerald-300 group-hover:text-white'}`}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
};

const MobileNavItem: React.FC<{ to: string, icon: React.ReactNode }> = ({ to, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`p-2 rounded-xl transition-all ${
        isActive ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400'
      }`}
    >
      {icon}
    </Link>
  );
}

export default App;
