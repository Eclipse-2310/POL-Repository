import React, { useState, useEffect } from 'react';
import { 
  Smile, 
  Moon, 
  BookOpen, 
  GraduationCap, 
  Users, 
  Sparkles, 
  ArrowUpRight, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Shield, 
  Info,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { Language, StudentWellbeingData } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

interface StudentDashboardProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];
  const studentId = 'CG-1042';

  const [data, setData] = useState<StudentWellbeingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState<'wellbeing' | 'sleep' | 'study' | 'mood'>('wellbeing');

  const fetchWellbeing = async () => {
    try {
      setLoading(true);
      const res = await api.getStudentWellbeing(studentId);
      setData(res);
    } catch (e: any) {
      onToast(e.message || 'Failed to fetch wellbeing data', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWellbeing();
  }, []);

  const getMoodEmoji = (val: number) => {
    if (val >= 4) return { emoji: '😊', label: 'Good' };
    if (val === 3) return { emoji: '😐', label: 'Okay' };
    return { emoji: '😔', label: 'Low' };
  };

  if (loading || !data) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="h-72 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  const { today_wellbeing, history_7d, insights } = data;
  const moodMeta = getMoodEmoji(today_wellbeing.mood);

  // Format chart dates for readability
  const chartData = history_7d.map((h) => ({
    ...h,
    shortDate: h.date.slice(5), // MM-DD
  }));

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 space-y-8">
      
      {/* Top Banner & Student ID */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
              ID: {studentId}
            </span>
            <span className="text-xs text-slate-500">Opt-In Student Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.todaysWellbeing}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personalized reflection and 7-day multi-dimensional trajectory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchWellbeing}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('checkin')}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            Take Daily Check-in
          </button>
        </div>
      </div>

      {/* 5 Today's Wellbeing Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        
        {/* Mood */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">{t.mood}</span>
            <span className="text-xl">{moodMeta.emoji}</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{moodMeta.label}</p>
          <p className="text-[11px] text-slate-500 mt-1">Rating: {today_wellbeing.mood} / 5</p>
        </div>

        {/* Sleep */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">{t.sleep}</span>
            <Moon className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{today_wellbeing.sleep_hours} <span className="text-xs font-normal text-slate-500">hrs</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Recommended: 7.5 - 8.5h</p>
        </div>

        {/* Study Workload */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">{t.study}</span>
            <BookOpen className="w-4 h-4 text-violet-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{today_wellbeing.study_hours} <span className="text-xs font-normal text-slate-500">hrs</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Academic & lab time</p>
        </div>

        {/* Attendance */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">{t.attendance}</span>
            <GraduationCap className="w-4 h-4 text-brand-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{today_wellbeing.attendance_pct}%</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            {today_wellbeing.attendance_pct >= 75 ? 'Above 75% threshold' : 'Below recommended'}
          </p>
        </div>

        {/* Social Connection */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">{t.socialConnection}</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-900 truncate">{today_wellbeing.isolation_level}</p>
          <p className="text-[11px] text-slate-500 mt-1">Peer interaction pulse</p>
        </div>

      </div>

      {/* 7-Day Trend Analytics with Recharts */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.weeklyTrends}
            </h2>
            <p className="text-xs text-slate-500">
              Visualizing multi-day trends helps identify fatigue cycles before burnout sets in.
            </p>
          </div>

          {/* Chart Toggle Buttons */}
          <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50 text-xs font-semibold">
            {[
              { id: 'wellbeing', label: 'Wellbeing' },
              { id: 'sleep', label: 'Sleep' },
              { id: 'study', label: 'Workload' },
              { id: 'mood', label: 'Mood' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveChart(btn.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeChart === btn.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Render Active Chart */}
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === 'wellbeing' ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="wellbeingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shortDate" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} / 100`, 'Heuristic Score']}
                />
                <Area type="monotone" dataKey="wellbeing_score" stroke="#4f46e5" strokeWidth={2.5} fill="url(#wellbeingGrad)" />
              </AreaChart>
            ) : activeChart === 'sleep' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shortDate" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 12]} stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} hours`, 'Sleep']}
                />
                <Bar dataKey="sleep_hours" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : activeChart === 'study' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shortDate" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 16]} stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} hours`, 'Study / Workload']}
                />
                <Line type="monotone" dataKey="study_hours" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4, fill: '#8b5cf6' }} />
              </LineChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shortDate" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[1, 5]} stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} / 5`, 'Mood']}
                />
                <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Supportive Automated Insights */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card">
        <div className="flex items-center gap-2 mb-4 text-brand-700 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>{t.supportiveInsights}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {insights.map((insight, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
            >
              <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-brand-50 border border-brand-100 text-brand-900">
        <div>
          <p className="font-semibold text-sm">Need a quiet space or someone to talk to?</p>
          <p className="text-xs text-brand-700 mt-0.5">Explore guided sleep practices, chat with our supportive assistant, or view confidential counselling.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('support')}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            Open Support Chat
          </button>
          <button
            onClick={() => onNavigate('resources')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-brand-200 transition-all"
          >
            Campus Resources
          </button>
        </div>
      </div>

    </div>
  );
};
