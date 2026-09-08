import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  HeartHandshake, 
  Lock, 
  Cpu, 
  Smartphone, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Moon, 
  BookOpen, 
  Smile,
  AlertCircle
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface LandingPageProps {
  lang: Language;
  onNavigate: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center px-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Opt-In Early-Warning Architecture</span>
            <span className="w-1 h-1 rounded-full bg-brand-400"></span>
            <span className="font-normal text-brand-600">Zero Clinical Stigma</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Early signals. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Earlier support.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.tagline} {t.heroSubtitle}
          </p>

          {/* Call to Actions */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('checkin')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {t.startCheckin}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {t.viewDashboard}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100% Opt-In & Anonymous
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No Medical Diagnosis
            </span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Human-in-the-Loop Review
            </span>
          </div>
        </div>

        {/* Polished Interactive Live Preview Card */}
        <div className="max-w-5xl mx-auto mt-12 px-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xl p-4 sm:p-6 transition-all hover:border-brand-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span className="ml-2 text-xs font-semibold text-slate-500">
                  Campus Wellness Command Center Preview
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                Live Heuristic Engine Active
              </span>
            </div>

            {/* Micro Dashboard Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Active Cohort</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">1,248</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5">↑ 94% opt-in rate</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Check-ins Today</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">842</p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">67.5% campus volume</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <p className="text-[11px] font-medium text-amber-800 uppercase tracking-wider">Needing Attention</p>
                <p className="text-2xl font-bold text-amber-900 mt-1">73</p>
                <p className="text-[11px] text-amber-700 font-medium mt-0.5">Mild stress or sleep deficit</p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/60">
                <p className="text-[11px] font-medium text-rose-800 uppercase tracking-wider">Support Recommended</p>
                <p className="text-2xl font-bold text-rose-900 mt-1">18</p>
                <p className="text-[11px] text-rose-700 font-medium mt-0.5">High isolation / overload</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                Aggregated Institutional View • Fully De-identified IDs (e.g. CG-1042)
              </span>
              <button
                onClick={() => onNavigate('admin')}
                className="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1"
              >
                Explore Full Command Center &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section: How It Works */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How CampusGuard Works</h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            A continuous, empathetic loop connecting student reflection with quiet institutional support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-base mb-4">
              01
            </div>
            <h3 className="font-semibold text-slate-900 text-base mb-2">Voluntary Daily Pulse</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students take a 30-second check-in measuring mood, sleep hours, study load, attendance, and feelings of isolation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base mb-4">
              02
            </div>
            <h3 className="font-semibold text-slate-900 text-base mb-2">Transparent Risk Heuristic</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multi-day trajectory algorithms evaluate cumulative sleep deficit and isolation without ever assigning diagnostic labels.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-base mb-4">
              03
            </div>
            <h3 className="font-semibold text-slate-900 text-base mb-2">Community Graph Insights</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              NetworkX analysis models peer connectivity and flags emerging social isolation clusters before disengagement occurs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base mb-4">
              04
            </div>
            <h3 className="font-semibold text-slate-900 text-base mb-2">Supportive Intervention</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students receive calming personalized recommendations, while wellness staff review anonymized high-priority alerts with consent.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Why CampusGuard */}
      <section className="bg-slate-900 text-white py-16 px-4 rounded-3xl max-w-6xl mx-auto shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
            A Paradigm Shift in Student Mental Health
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
            A safety net, not a surveillance system.
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Traditional campus wellness waits for a crisis event or emergency room visit. CampusGuard inverts this paradigm by detecting subtle early indicators—such as 3 consecutive nights of low sleep or abrupt social withdrawal—allowing staff to extend supportive warmth before distress becomes irreversible.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-left">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
              <p className="text-emerald-400 font-semibold text-sm mb-1">Traditional Model</p>
              <p className="text-xs text-slate-400">Late intervention, stigmatized visits, student silence, reactive crisis management.</p>
            </div>
            <div className="p-5 rounded-2xl bg-brand-900/60 border border-brand-500/50 sm:col-span-2">
              <p className="text-brand-300 font-semibold text-sm mb-1">The CampusGuard Approach</p>
              <p className="text-xs text-slate-200">Continuous anonymized pulse, zero diagnosis, human-reviewed gentle outreach, and complete student data sovereignty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Privacy-First Architecture & 7 Tenets */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Ethical Guardrails Built-in
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Built on uncompromising privacy principles
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              We believe students will only trust a wellbeing tool if it genuinely safeguards their autonomy. CampusGuard enforces role-based access control, cryptographic anonymous IDs, and strictly prohibits punitive tracking.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "100% Opt-In: Students join voluntarily and can withdraw anytime.",
                "Anonymous IDs: Evaluators only see codes like CG-1042, never names or roll numbers.",
                "Non-Diagnostic: Algorithms flag pattern changes, never medical pathologies.",
                "Zero Surveillance: No browser tracking, keystroke logging, or location spying.",
                "Human-in-the-Loop: Automated alerts are always reviewed by trained wellness staff."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onNavigate('privacy')}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Explore Privacy Architecture &rarr;
            </button>
          </div>

          <div className="w-full md:w-1/2 p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Data Flow Architecture
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-semibold text-slate-800">Student Device</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Local Draft Cache</span>
              </div>
              <div className="flex justify-center text-slate-400">↓ SSL / TLS Encrypted</div>
              <div className="p-3 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-between">
                <span className="font-semibold text-brand-900">Anonymization Gateway</span>
                <span className="text-brand-700 bg-brand-100 px-2 py-0.5 rounded">CG-ID Assigned</span>
              </div>
              <div className="flex justify-center text-slate-400">↓ De-identified payload</div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-semibold text-slate-800">Heuristic Risk & Graph Engine</span>
                <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Scoring (0-100)</span>
              </div>
              <div className="flex justify-center text-slate-400">↓ Aggregated Signals</div>
              <div className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <span className="font-semibold">Institutional Command Center</span>
                <span className="text-brand-300 bg-slate-800 px-2 py-0.5 rounded">Human Review Only</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Rural & Low-Bandwidth Resilience */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-50 via-brand-50/40 to-slate-50 border border-slate-200">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Inclusivity by Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Built for ₹5,000 smartphones & unstable 2G/3G networks
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Underserved and rural institutions often face poor connectivity and budget hardware. CampusGuard is engineered to be featherweight (no video backgrounds, zero bloated animations), saves offline drafts automatically, and queues submissions locally until connection returns.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-lg font-bold text-slate-900">&lt; 150 KB</p>
                <p className="text-[11px] text-slate-500">Total initial bundle</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-lg font-bold text-slate-900">Offline Queue</p>
                <p className="text-[11px] text-slate-500">Auto-sync on reconnect</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-lg font-bold text-slate-900">3 Languages</p>
                <p className="text-[11px] text-slate-500">English, हिन्दी, मराठी</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-lg font-bold text-slate-900">Zero Battery Drain</p>
                <p className="text-[11px] text-slate-500">Minimal client execution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="max-w-4xl mx-auto text-center px-4 pt-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Ready to experience the prototype?
        </h2>
        <p className="mt-2 text-slate-600 text-sm">
          Test the student check-in, inspect the early-warning scoring, or review the wellness command center.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('checkin')}
            className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-all"
          >
            Start Student Check-in
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all"
          >
            Open Admin Command Center
          </button>
          <button
            onClick={() => onNavigate('support')}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-sm transition-all"
          >
            Test Support Chatbot
          </button>
        </div>
      </section>

    </div>
  );
};
