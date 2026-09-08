import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  TrendingUp, 
  Minus, 
  HeartHandshake,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { AlertItem, StudentAdminDetail } from '../types';
import { api } from '../services/api';

interface AlertDetailPanelProps {
  alert: AlertItem;
  onClose: () => void;
  onActionComplete: () => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const AlertDetailPanel: React.FC<AlertDetailPanelProps> = ({
  alert,
  onClose,
  onActionComplete,
  onToast,
}) => {
  const [detail, setDetail] = useState<StudentAdminDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(alert.notes || '');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await api.getAdminStudentDetail(alert.student_id);
        setDetail(res);
      } catch (e: any) {
        onToast(e.message || 'Failed to load student details', 'warning');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [alert.student_id]);

  const handleAction = async (actionType: 'reviewed' | 'counsellor_requested' | 'dismissed') => {
    try {
      setUpdating(true);
      await api.updateAlertAction(alert.id, actionType, notes);
      onToast(`Alert updated: marked as ${actionType.replace('_', ' ')}`, 'success');
      onActionComplete();
      onClose();
    } catch (e: any) {
      onToast(e.message || 'Failed to update alert', 'warning');
    } finally {
      setUpdating(false);
    }
  };

  const chartData = detail?.history_7d.map((h) => ({
    ...h,
    shortDate: h.date.slice(5),
  })) || [];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-left">
        
        {/* Top bar */}
        <div>
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  {alert.student_id}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  alert.risk_level === 'High'
                    ? 'bg-rose-100 text-rose-800'
                    : alert.risk_level === 'Medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {alert.risk_level} Priority
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Anonymous ID • Cohort Year {detail?.year || 2} • {detail?.department || 'Engineering'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Risk Score Summary Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Calculated Early-Warning Score
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {alert.risk_score.toFixed(0)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ 100</span>
                  <span className="text-xs text-slate-400 font-normal">
                    (Threshold: &gt;=68 High, &gt;=35 Medium)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Trajectory
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 mt-1">
                  {alert.trend === 'declining' ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-rose-500" />
                      Deteriorating
                    </>
                  ) : alert.trend === 'improving' ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      Recovering
                    </>
                  ) : (
                    <>
                      <Minus className="w-4 h-4 text-slate-400" />
                      Stable
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Contributing Heuristic Factors */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Contributing Early Indicators
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {alert.top_factors.map((factor, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium border border-slate-200"
                  >
                    • {factor}
                  </span>
                ))}
              </div>
            </div>

            {/* 7-Day Sparkline Trajectories */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                7-Day Multi-Dimensional Sparklines
              </h3>

              <div className="space-y-3">
                
                {/* Sleep sparkline */}
                <div className="p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Sleep Duration (hrs)</span>
                    <span className="text-slate-500">Target: 7.5h</span>
                  </div>
                  <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line type="monotone" dataKey="sleep_hours" stroke="#6366f1" strokeWidth={2} dot={{ r: 2 }} />
                        <XAxis dataKey="shortDate" hide />
                        <YAxis domain={[0, 12]} hide />
                        <Tooltip contentStyle={{ fontSize: '11px', padding: '4px 8px' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Mood sparkline */}
                <div className="p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Self-Reported Mood (1-5)</span>
                    <span className="text-slate-500">1: Low, 5: Great</span>
                  </div>
                  <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                        <XAxis dataKey="shortDate" hide />
                        <YAxis domain={[1, 5]} hide />
                        <Tooltip contentStyle={{ fontSize: '11px', padding: '4px 8px' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Attendance sparkline */}
                <div className="p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Class Attendance %</span>
                    <span className="text-slate-500">Threshold: 75%</span>
                  </div>
                  <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line type="monotone" dataKey="attendance_pct" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
                        <XAxis dataKey="shortDate" hide />
                        <YAxis domain={[0, 100]} hide />
                        <Tooltip contentStyle={{ fontSize: '11px', padding: '4px 8px' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>

            {/* Suggested Supportive Action */}
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200">
              <p className="text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
                Suggested Supportive Action
              </p>
              <p className="text-xs text-brand-800 leading-relaxed">
                {alert.suggested_action}
              </p>
            </div>

            {/* Internal Reviewer Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institutional Review Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log internal action taken (e.g., reached out via student advisor circle)..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none"
              ></textarea>
            </div>

            {/* Non-Coercion Consent Reminder */}
            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Institutional Ethics Principle:</strong> Do NOT automatically contact or expose students without consent. Supportive interventions must respect student autonomy and privacy boundaries.
              </span>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => handleAction('dismissed')}
            disabled={updating}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-colors"
          >
            Dismiss Alert
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('reviewed')}
              disabled={updating}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-all"
            >
              Mark Reviewed
            </button>
            <button
              onClick={() => handleAction('counsellor_requested')}
              disabled={updating}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              Request Counsellor Follow-up
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
