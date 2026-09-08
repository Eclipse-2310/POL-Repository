import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface DemoBannerProps {
  lang: Language;
  onRefreshData?: () => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ lang, onRefreshData, onToast }) => {
  const t = translations[lang];
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    try {
      setResetting(true);
      await api.resetDemoData();
      onToast('Synthetic demo data successfully refreshed!', 'success');
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      onToast(e.message || 'Failed to reset demo data', 'warning');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[11px]">
            <Sparkles className="w-3 h-3 text-brand-400" />
            {t.demoModeBadge}
          </span>
          <span className="text-slate-300 font-normal">
            {t.demoModeNotice}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-slate-400 text-[11px]">
            Safety Net Architecture • Non-Diagnostic Heuristic
          </span>
          <button
            onClick={handleReset}
            disabled={resetting}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors font-medium text-[11px] disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${resetting ? 'animate-spin' : ''}`} />
            {resetting ? 'Resetting...' : t.resetDemoData}
          </button>
        </div>
      </div>
    </div>
  );
};
