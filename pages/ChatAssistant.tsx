
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, RefreshCw, Bookmark } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Assalamu\'alaikum! Saya Chatour Assistant. Ada yang bisa saya bantu terkait rencana ibadah Umroh Anda?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const response = await chatWithAssistant(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response || 'Maaf, terjadi kesalahan.' }]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-emerald-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 leading-none">Chatour Assistant</h3>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-slate-500 font-medium">Online • Expert AI</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-xl transition-all"><Bookmark size={20} /></button>
          <button onClick={() => setMessages([messages[0]])} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-xl transition-all"><RefreshCw size={20} /></button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-emerald-100 text-emerald-600">
                <Sparkles size={16} />
              </div>
              <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-100">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Tanyakan jadwal manasik, paket promo, atau tips umroh..."
            className="w-full bg-white border border-slate-200 pl-6 pr-14 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all text-sm group-hover:border-emerald-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              input.trim() && !loading ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-200 text-slate-400'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-3 font-medium uppercase tracking-wider">Powered by Gemini AI • Chatour Assistant v1.0</p>
      </div>
    </div>
  );
};

export default ChatAssistant;
