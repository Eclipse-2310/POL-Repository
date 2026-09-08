import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  PhoneCall, 
  Clock, 
  Search, 
  ExternalLink, 
  HeartHandshake, 
  ShieldAlert, 
  Moon, 
  Sparkles, 
  Users, 
  Brain 
} from 'lucide-react';
import { Language, SupportResource } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

interface ResourcesPageProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];

  const [resources, setResources] = useState<SupportResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const data = await api.getResources();
        setResources(data);
      } catch (e: any) {
        onToast(e.message || 'Failed to fetch resources', 'warning');
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const categories = ['All', 'Emergency', 'Counsellor', 'Academic', 'Sleep', 'Peer', 'Stress'];

  const filtered = resources.filter((r) => {
    const matchesCat = categoryFilter === 'All' || r.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.contact_info.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'emergency': return ShieldAlert;
      case 'counsellor': return HeartHandshake;
      case 'academic': return Brain;
      case 'sleep': return Moon;
      case 'peer': return Users;
      default: return Sparkles;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
            Institutional Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Support & Wellness Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Free, confidential support networks across campus and national crisis helplines.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources, helplines..."
            className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none w-56 sm:w-64 bg-white"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat === 'Emergency' ? '🚨 24/7 Helplines' : cat}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-3xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between shadow-card hover:shadow-floating transition-all ${
                  item.is_emergency
                    ? 'bg-rose-50/40 border-rose-200/90 ring-1 ring-rose-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      item.is_emergency
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-brand-50 text-brand-700'
                    }`}>
                      {item.category}
                    </span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      item.is_emergency ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100/80">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.availability}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span className="truncate">{item.contact_info}</span>
                    {item.is_emergency ? (
                      <a
                        href={`tel:${item.contact_info.replace(/[^0-9]/g, '')}`}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] hover:bg-rose-700 shrink-0 ml-2"
                      >
                        Call Now
                      </a>
                    ) : (
                      <span className="text-brand-600 text-[11px] shrink-0 ml-2">Walk-In / Email</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Emergency Bottom Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-sm">Need immediate mental health support?</p>
          <p className="text-xs text-slate-300 mt-0.5">Government of India Tele-MANAS toll-free 24x7 crisis counselling.</p>
        </div>
        <a
          href="tel:14416"
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-colors shadow-md"
        >
          <PhoneCall className="w-4 h-4" />
          Call 14416 Toll-Free
        </a>
      </div>

    </div>
  );
};
