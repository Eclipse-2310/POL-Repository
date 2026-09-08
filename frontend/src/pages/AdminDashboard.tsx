import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CalendarCheck, 
  AlertTriangle, 
  Flame, 
  Search, 
  Filter, 
  ExternalLink, 
  RefreshCw, 
  Share2, 
  ShieldAlert, 
  ArrowUpRight, 
  ChevronRight,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Minus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { Language, AdminOverview, AlertItem } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';
import { StatCard } from '../components/StatCard';
import { AlertDetailPanel } from './AlertDetailPanel';

interface AdminDashboardProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];

  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & search
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ov, al] = await Promise.all([
        api.getAdminOverview(),
        api.getAdminAlerts(),
      ]);
      setOverview(ov);
      setAlerts(al);
    } catch (e: any) {
      onToast(e.message || 'Failed to load command center data', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const donutColors = ['#10b981', '#f59e0b', '#ef4444']; // Low, Medium, High

  const filteredAlerts = alerts.filter((item) => {
    const matchesLevel = 
      filterLevel === 'all' 
        ? true 
        : filterLevel === 'pending'
        ? item.status === 'pending'
        : item.risk_level.toLowerCase() === filterLevel.toLowerCase();
    
    const matchesSearch = 
      item.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.top_factors.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesLevel && matchesSearch;
  });

  if (loading || !overview) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-72 bg-slate-200 rounded-2xl"></div>
          <div className="h-72 bg-slate-200 rounded-2xl md:col-span-2"></div>
        </div>
      </div>
    );
  }

  const donutData = [
    { name: 'Low Risk', value: overview.risk_distribution.low, pct: overview.risk_distribution.low_pct },
    { name: 'Medium Risk', value: overview.risk_distribution.medium, pct: overview.risk_distribution.medium_pct },
    { name: 'High Risk', value: overview.risk_distribution.high, pct: overview.risk_distribution.high_pct },
  ];

  const trendData = overview.trends_14d.map((pt) => ({
    ...pt,
    shortDate: pt.date.slice(5),
  }));

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
              Institution Command View
            </span>
            <span className="text-xs text-slate-500">De-identified Cohort</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.commandCenter}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.commandCenterSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('socialGraph')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs shadow-sm flex items-center gap-2 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-600" />
            Community Connection Graph &rarr;
          </button>
          
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh Command Center"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Core KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t.totalActiveStudents}
          value={overview.total_active_students.toLocaleString()}
          subtitle="94% voluntary participation"
          icon={Users}
          variant="brand"
        />
        <StatCard
          title={t.checkinsToday}
          value={overview.checkins_today.toLocaleString()}
          subtitle="67.5% campus volume"
          trend={{ value: "+8.4%", positive: true }}
          icon={CalendarCheck}
          variant="default"
        />
        <StatCard
          title={t.studentsNeedingAttention}
          value={overview.students_needing_attention}
          subtitle="Moderate sleep deficit or workload"
          icon={AlertTriangle}
          variant="warning"
        />
        <StatCard
          title={t.highPriorityAlerts}
          value={overview.high_priority_alerts}
          subtitle="Awaiting staff review"
          icon={Flame}
          variant="danger"
        />
      </div>

      {/* Analytics Row: Donut Chart + 14-Day Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk Distribution Donut Chart */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {t.riskDistribution}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Current cohort balance across early-warning tiers
            </p>
          </div>

          <div className="h-56 my-2 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={donutColors[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any, name: any) => [`${val} students`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center label */}
            <div className="absolute text-center pointer-events-none">
              <span className="text-xs text-slate-400 font-medium block">Total Cohort</span>
              <span className="text-xl font-extrabold text-slate-900">
                {overview.risk_distribution.low + overview.risk_distribution.medium + overview.risk_distribution.high}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
            <div>
              <span className="text-[10px] font-semibold text-emerald-700 block">Low ({overview.risk_distribution.low_pct}%)</span>
              <span className="text-xs font-bold text-slate-900">{overview.risk_distribution.low}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-amber-700 block">Med ({overview.risk_distribution.medium_pct}%)</span>
              <span className="text-xs font-bold text-slate-900">{overview.risk_distribution.medium}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-rose-700 block">High ({overview.risk_distribution.high_pct}%)</span>
              <span className="text-xs font-bold text-slate-900">{overview.risk_distribution.high}</span>
            </div>
          </div>
        </div>

        {/* 14-Day Campus Wellbeing Trajectory */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">
                14-Day Campus Wellbeing Trends
              </h2>
              <span className="text-xs text-slate-500 font-medium">Aggregated Trajectories</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoring cohort averages in sleep, mood, and composite stress helps evaluate term workloads.
            </p>
          </div>

          <div className="h-64 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="trendSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shortDate" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" name="Avg Sleep (hrs)" dataKey="avg_sleep" stroke="#6366f1" strokeWidth={2.5} fill="url(#trendSleep)" />
                <Line type="monotone" name="Avg Mood (1-5)" dataKey="avg_mood" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" name="Avg Workload (hrs)" dataKey="avg_study" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Early Warning Alerts Section */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.earlyWarningAlerts}
            </h2>
            <p className="text-xs text-slate-500">
              Prioritized by early-warning heuristic score. All identities strictly anonymous.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CG-ID or factor..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none w-44 sm:w-56"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50 text-xs font-medium">
              {[
                { id: 'all', label: 'All' },
                { id: 'high', label: 'High' },
                { id: 'medium', label: 'Medium' },
                { id: 'pending', label: 'Pending' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setFilterLevel(pill.id)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterLevel === pill.id
                      ? 'bg-white text-slate-900 font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">{t.studentId}</th>
                <th className="py-3.5 px-4">Risk Level</th>
                <th className="py-3.5 px-4">{t.riskScore}</th>
                <th className="py-3.5 px-4">{t.topFactors}</th>
                <th className="py-3.5 px-4">{t.trend}</th>
                <th className="py-3.5 px-4">{t.lastCheckin}</th>
                <th className="py-3.5 px-4 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No alerts matching current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr 
                    key={alert.id}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                      {alert.student_id}
                      {alert.status === 'counsellor_requested' && (
                        <span className="w-2 h-2 rounded-full bg-brand-500" title="Counsellor Follow-up Requested"></span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                        alert.risk_level === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : alert.risk_level === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {alert.risk_level}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-slate-900">
                      {alert.risk_score.toFixed(0)}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {alert.top_factors.map((f, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
                        {alert.trend === 'declining' ? (
                          <>
                            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                            <span className="text-rose-700">Declining</span>
                          </>
                        ) : alert.trend === 'improving' ? (
                          <>
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-700">Improving</span>
                          </>
                        ) : (
                          <>
                            <Minus className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-600">Stable</span>
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {alert.last_checkin}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAlert(alert);
                        }}
                        className="px-3 py-1 rounded-lg bg-slate-100 group-hover:bg-brand-50 text-slate-700 group-hover:text-brand-700 font-semibold transition-all inline-flex items-center gap-1 text-[11px]"
                      >
                        {t.reviewAlert}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Alert Detail Side Panel Modal/Drawer */}
      {selectedAlert && (
        <AlertDetailPanel
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onActionComplete={fetchData}
          onToast={onToast}
        />
      )}

    </div>
  );
};
