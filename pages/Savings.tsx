
import React, { useState } from 'react';
import { CreditCard, History, Info, ChevronRight, Copy, CheckCircle2, ArrowLeft, Wallet, TrendingUp } from 'lucide-react';
import { User } from '../types';

const Savings: React.FC<{ user: User }> = ({ user }) => {
  const [showDetail, setShowDetail] = useState(false);

  if (!showDetail) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <Wallet size={32} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Saldo Tabungan Umroh</p>
              <h3 className="text-3xl font-black text-slate-800">Rp {user.balance.toLocaleString('id-ID')}</h3>
              <p className="text-emerald-600 text-xs font-bold mt-1 flex items-center gap-1 uppercase tracking-wider">
                <CheckCircle2 size={12} /> {user.name}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowDetail(true)}
            className="w-full md:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 group"
          >
            Lihat Detail Tabungan 
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
            <div className="flex items-center gap-3 mb-2 text-emerald-800">
              <TrendingUp size={20} />
              <h4 className="font-bold">Estimasi Keberangkatan</h4>
            </div>
            <p className="text-sm text-emerald-700 leading-relaxed">Berdasarkan kecepatan menabung Anda, Anda diperkirakan dapat berangkat pada <strong>Ramadhan 1447 H</strong>. Tetap istiqomah!</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl">
            <div className="flex items-center gap-3 mb-2 text-amber-800">
              <Info size={20} />
              <h4 className="font-bold">Informasi Penting</h4>
            </div>
            <p className="text-sm text-amber-700 leading-relaxed">Pastikan setoran Anda dilakukan melalui Virtual Account yang tertera di menu detail untuk verifikasi otomatis.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setShowDetail(false)}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors group"
        >
          <div className="p-2 bg-white rounded-xl border border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-all">
            <ArrowLeft size={18} />
          </div>
          Kembali ke Ringkasan
        </button>
        <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
           <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Detail Terverifikasi</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <div className="bg-gradient-to-br from-slate-800 to-black p-6 rounded-2xl aspect-[1.6/1] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CreditCard size={120} />
              </div>
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-amber-400 text-lg">CHATOUR ID</h4>
                <div className="w-12 h-8 bg-amber-400 rounded-md"></div>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Nomor Virtual Account</p>
                <p className="text-xl font-mono tracking-[4px]">{user.virtualAccount}</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Nama Jamaah</p>
                  <p className="font-bold">{user.name.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-emerald-400 text-sm font-bold flex items-center gap-1"><CheckCircle2 size={12}/> ACTIVE</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="text-xl font-bold text-slate-800">Detail Tabungan</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">Saldo Tersedia</span>
                <span className="font-bold text-emerald-600">Rp {user.balance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">Total Setoran</span>
                <span className="font-bold text-slate-800">12 Kali</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">Target Paket</span>
                <span className="font-bold text-slate-800">Premium Gold</span>
              </div>
            </div>
            <button className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100">
              <Copy size={18} /> Salin Nomor VA
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <History size={20} className="text-slate-400" />
            <h4 className="text-lg font-bold text-slate-800">Riwayat Transaksi</h4>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-600 rounded-lg">Semua</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg">Masuk</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg">Keluar</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                <th className="px-6 py-4">ID Transaksi</th>
                <th className="px-6 py-4">Keterangan</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Nominal</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 'TX-9921', desc: 'Setoran Rutin Mei', date: '20/05/2024', amount: '2.500.000', status: 'Selesai' },
                { id: 'TX-9840', desc: 'Komisi Referral (Jamaah Budi)', date: '18/05/2024', amount: '500.000', status: 'Selesai' },
                { id: 'TX-9701', desc: 'Admin Monthly Fee', date: '15/05/2024', amount: '-15.000', status: 'Selesai' },
                { id: 'TX-9620', desc: 'Setoran Rutin April', date: '20/04/2024', amount: '2.500.000', status: 'Selesai' },
                { id: 'TX-9511', desc: 'Setoran Awal / Booking', date: '01/04/2024', amount: '10.000.000', status: 'Selesai' },
              ].map((tx, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 text-xs font-mono font-medium text-slate-400">{tx.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{tx.desc}</p>
                    <div className="md:hidden text-[10px] text-slate-400 mt-1">{tx.date}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{tx.date}</td>
                  <td className={`px-6 py-4 text-sm font-bold ${tx.amount.startsWith('-') ? 'text-red-500' : 'text-emerald-600'}`}>
                    {tx.amount.startsWith('-') ? '-Rp ' : 'Rp '}{tx.amount.replace('-', '')}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Savings;
