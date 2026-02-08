
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Added TrendingUp and ChevronRight to the import list to fix 'Cannot find name' errors
import { Wallet, Users, ArrowUpRight, Clock, MapPin, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { User } from '../types';

const data = [
  { month: 'Jan', balance: 2000000 },
  { month: 'Feb', balance: 4500000 },
  { month: 'Mar', balance: 8000000 },
  { month: 'Apr', balance: 10500000 },
  { month: 'May', balance: 13000000 },
  { month: 'Jun', balance: 15450000 },
];

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-emerald-100 text-sm font-medium">Saldo Tabungan Umroh</p>
            <h3 className="text-3xl font-bold mt-1">Rp {user.balance.toLocaleString('id-ID')}</h3>
            <div className="mt-4 flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full text-xs">
              <TrendingUp size={14} />
              <span>+15% dari bulan lalu</span>
            </div>
          </div>
          <Wallet className="absolute -bottom-4 -right-4 w-32 h-32 text-emerald-400/20" />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Virtual Account</p>
              <h3 className="text-lg font-bold mt-1 text-emerald-800 font-mono tracking-wider">{user.virtualAccount}</h3>
            </div>
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Users size={20} />
            </div>
          </div>
          <button className="text-emerald-600 text-sm font-semibold flex items-center gap-1 hover:underline mt-4">
            Salin Nomor VA <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-4">Progres Target Umroh</p>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                  Umroh Premium (30jt)
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-emerald-600">
                  {Math.round((user.balance / 30000000) * 100)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100">
              <div style={{ width: `${(user.balance / 30000000) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-1000"></div>
            </div>
            <p className="text-xs text-slate-400 italic font-medium">Target Keberangkatan: Syawal 1446 H</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold mb-6 text-slate-800">Pertumbuhan Tabungan</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [`Rp ${value.toLocaleString()}`, 'Saldo']}
                />
                <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold text-slate-800">Aktivitas Terbaru</h4>
            <button className="text-emerald-600 text-sm font-medium hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Setoran Rutin', date: '20 Mei, 09:41', amount: '+Rp 2.500.000', type: 'in' },
              { label: 'Komisi Referral', date: '18 Mei, 14:20', amount: '+Rp 500.000', type: 'in' },
              { label: 'Biaya Admin', date: '15 Mei, 23:59', amount: '-Rp 15.000', type: 'out' },
              { label: 'Setoran Awal', date: '01 Mei, 10:00', amount: '+Rp 2.000.000', type: 'in' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className={`p-3 rounded-2xl ${activity.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {activity.type === 'in' ? <ArrowUpRight size={20} /> : <Clock size={20} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{activity.label}</p>
                  <p className="text-xs text-slate-400">{activity.date}</p>
                </div>
                <p className={`text-sm font-bold ${activity.type === 'in' ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {activity.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Packages */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-slate-800">Paket Umroh Populer</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Paket Hemat 9 Hari', price: 'Rp 26.500.000', desc: 'Hotel *3 dekat Masjidil Haram', rating: '4.8' },
            { name: 'Paket Gold 12 Hari', price: 'Rp 32.000.000', desc: 'Hotel *5 Hilton Suites', rating: '4.9' },
            { name: 'Umroh + Turki', price: 'Rp 45.500.000', desc: 'Winter in Cappadocia', rating: '5.0' },
            { name: 'Ramadhan Full', price: 'Rp 55.000.000', desc: 'Keberangkatan awal Ramadhan', rating: '4.7' },
          ].map((pkg, i) => (
            <div key={i} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="w-full h-32 rounded-2xl bg-slate-100 mb-4 overflow-hidden relative">
                <img src={`https://picsum.photos/400/300?random=${i}`} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-[10px] font-bold text-amber-500 shadow-sm">
                  <Star size={10} fill="currentColor" /> {pkg.rating}
                </div>
              </div>
              <h5 className="font-bold text-slate-800 text-sm">{pkg.name}</h5>
              <p className="text-[11px] text-slate-500 mb-2 truncate">{pkg.desc}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-emerald-600 font-bold text-sm">{pkg.price}</p>
                <div className="p-1 text-slate-400 hover:text-emerald-600">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
