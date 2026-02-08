
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Wallet, Users, Target, Download, TrendingUp, Search, Filter } from 'lucide-react';
import { User } from '../types';

const subAgentPerformance = [
  { name: 'Rahmat', count: 12, commission: 6000000 },
  { name: 'Siti', count: 8, commission: 4000000 },
  { name: 'Indra', count: 15, commission: 7500000 },
  { name: 'Dewi', count: 5, commission: 2500000 },
  { name: 'Budi', count: 10, commission: 5000000 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const AgentPanel: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Agen & Komisi</h2>
          <p className="text-slate-500 text-sm font-medium">Monitor performa tim dan transparansi pendapatan Anda.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all text-sm shadow-lg shadow-emerald-100">
          <Download size={18} /> Ekspor Laporan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Komisi', value: 'Rp 45.200.000', icon: <Wallet className="text-blue-600" />, bg: 'bg-blue-50' },
          { label: 'Sub-Agen Aktif', value: '24', icon: <Users className="text-emerald-600" />, bg: 'bg-emerald-50' },
          { label: 'Pending Payout', value: 'Rp 2.150.000', icon: <Target className="text-amber-600" />, bg: 'bg-amber-50' },
          { label: 'Total Jamaah', value: '186', icon: <TrendingUp className="text-purple-600" />, bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-6">Performa Pendaftaran Sub-Agen</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subAgentPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                  {subAgentPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold text-slate-800">Daftar Sub-Agen Unggulan</h4>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-emerald-600"><Search size={18} /></button>
              <button className="p-2 text-slate-400 hover:text-emerald-600"><Filter size={18} /></button>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            {subAgentPerformance.sort((a, b) => b.count - a.count).map((agent, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                  {agent.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{agent.name}</p>
                  <p className="text-xs text-slate-400">{agent.count} Jamaah Terdaftar</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">Rp {(agent.commission / 1000000).toFixed(1)}jt</p>
                  <div className="flex items-center justify-end text-[10px] text-slate-400 gap-1">
                    <TrendingUp size={10} className="text-emerald-500" /> Komisi
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPanel;
