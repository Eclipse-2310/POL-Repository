import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareHeart, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  Clock,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { Language, ChatMessage, EmergencyContact } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

interface SupportChatProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const SupportChat: React.FC<SupportChatProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello. I'm CampusGuard Support. You can talk freely about academic stress, heavy workload, sleep difficulties, or feeling isolated. How are you holding up today?",
      time: 'Just now',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.sendChatMessage(query);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: res.reply,
        isCrisis: res.is_crisis,
        emergencyContacts: res.emergency_contacts,
        suggestedResources: res.suggested_resources,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e: any) {
      onToast(e.message || 'Failed to send message', 'warning');
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "I'm stressed about exams.",
    "I feel lonely.",
    "I haven't slept well in days.",
    "I'm feeling completely overwhelmed with coursework.",
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 flex flex-col h-[calc(100vh-160px)] min-h-[580px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">CampusGuard Support</h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online"></span>
            </div>
            <p className="text-xs text-slate-500">
              You can talk about stress, workload, sleep or feeling isolated.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: '1',
                sender: 'bot',
                text: "Hello. I'm CampusGuard Support. You can talk freely about academic stress, heavy workload, sleep difficulties, or feeling isolated. How are you holding up today?",
                time: 'Just now',
              }
            ]);
          }}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Reset Conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
              m.sender === 'user' 
                ? 'bg-slate-900 text-white' 
                : m.isCrisis 
                ? 'bg-rose-100 text-rose-700' 
                : 'bg-brand-100 text-brand-700'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-lg ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              
              {/* Message bubble */}
              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-brand-600 text-white shadow-sm rounded-tr-sm'
                  : m.isCrisis
                  ? 'bg-rose-50 border border-rose-200 text-rose-950 shadow-card rounded-tl-sm'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-card rounded-tl-sm'
              }`}>
                {m.isCrisis && (
                  <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-2 text-xs uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    Immediate Support & Safety Protocol
                  </div>
                )}
                <p className="whitespace-pre-line">{m.text}</p>
              </div>

              {/* Emergency Helpline Cards if crisis detected */}
              {m.emergencyContacts && m.emergencyContacts.length > 0 && (
                <div className="mt-3 space-y-2">
                  {m.emergencyContacts.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white border border-rose-200 shadow-sm flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{c.name}</p>
                        <p className="text-[11px] text-slate-500">{c.description}</p>
                      </div>
                      <a
                        href={`tel:${c.phone.replace(/[^0-9]/g, '')}`}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1.5 shrink-0"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        {c.phone}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggested action pills */}
              {m.suggestedResources && m.suggestedResources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.suggestedResources.map((res, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium"
                    >
                      {res}
                    </span>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-slate-400 mt-1 block px-1">
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-400 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse delay-200"></span>
              <span>Composing supportive response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Prompts */}
      <div className="pt-3 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">Try asking:</span>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-slate-200"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share what is currently on your mind..."
          className="flex-1 p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 bg-white"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-2 text-center">
        <p className="text-[10px] text-slate-400">
          CampusGuard Support provides supportive listening, not clinical medical diagnosis.
        </p>
      </div>

    </div>
  );
};
