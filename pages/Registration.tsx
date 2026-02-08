
import React, { useState } from 'react';
// Added missing Clock icon to fix 'Cannot find name' error
import { UserPlus, ShieldCheck, Mail, Phone, CreditCard, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

const Registration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    email: '',
    phone: '',
    package: '',
    deposit: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex h-2">
          <div className={`flex-1 transition-all duration-500 ${step >= 1 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
          <div className={`flex-1 transition-all duration-500 ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
          <div className={`flex-1 transition-all duration-500 ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
        </div>
        
        <div className="p-8">
          <div className="mb-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <UserPlus size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Pendaftaran Jamaah Baru</h2>
            <p className="text-slate-500 text-center max-w-sm mt-2">Lengkapi data diri jamaah untuk membuka Tabungan Umroh Chatour ID.</p>
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nama Lengkap Sesuai Paspor</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Ahmad Abdullah"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nomor Induk Kependudukan (NIK)</label>
                  <input 
                    type="text" 
                    placeholder="16 Digit NIK"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={formData.nik}
                    onChange={(e) => setFormData({...formData, nik: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Aktif</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      placeholder="email@provider.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nomor WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="tel" 
                      placeholder="+62 812..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <button 
                onClick={nextStep}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
              >
                Lanjutkan Ke Pilihan Paket <ChevronRight size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'hmt', name: 'Hemat', price: '26jt', time: '9 Hari' },
                  { id: 'gld', name: 'Gold', price: '32jt', time: '12 Hari' },
                  { id: 'vip', name: 'VIP', price: '45jt', time: '14 Hari' },
                ].map((pkg) => (
                  <label key={pkg.id} className={`cursor-pointer group relative p-6 rounded-2xl border-2 transition-all ${formData.package === pkg.id ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'}`}>
                    <input 
                      type="radio" 
                      name="package" 
                      className="hidden" 
                      onChange={() => setFormData({...formData, package: pkg.id})} 
                    />
                    <div className="flex flex-col h-full">
                      <span className="text-sm text-slate-500 font-medium">Paket</span>
                      <span className="text-xl font-bold text-slate-800">{pkg.name}</span>
                      <span className="mt-4 text-2xl font-black text-emerald-600">Rp {pkg.price}</span>
                      <div className="mt-auto pt-4 flex items-center gap-1 text-slate-500 text-xs">
                        <Clock size={12} /> {pkg.time}
                      </div>
                      {formData.package === pkg.id && (
                        <div className="absolute top-4 right-4 text-emerald-600">
                          <CheckCircle2 size={24} />
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Setoran Awal (Booking Fee)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-emerald-600">Rp</div>
                  <input 
                    type="number" 
                    placeholder="Min. 2.000.000"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={formData.deposit}
                    onChange={(e) => setFormData({...formData, deposit: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={prevStep}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all"
                >
                  Kembali
                </button>
                <button 
                  onClick={nextStep}
                  className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                >
                  Verifikasi Akhir <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in zoom-in duration-500 text-center py-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                <ShieldCheck size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Verifikasi Data Berhasil</h3>
                <p className="text-slate-500 mt-2">Silakan konfirmasi data berikut sebelum pembuatan Virtual Account.</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-3 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 text-sm">Nama</span>
                  <span className="font-bold text-slate-800">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 text-sm">Paket</span>
                  <span className="font-bold text-slate-800 uppercase">{formData.package}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 text-sm">Setoran Awal</span>
                  <span className="font-bold text-emerald-600">Rp {parseInt(formData.deposit).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={prevStep}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all"
                >
                  Edit Data
                </button>
                <button 
                  className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-200"
                  onClick={() => alert("Pendaftaran Berhasil! Nomor VA akan dikirim via WA.")}
                >
                  Selesaikan Pendaftaran
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
