import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  UserCheck, 
  Server, 
  CheckCircle2, 
  FileText, 
  HeartHandshake, 
  KeyRound,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface PrivacyCenterProps {
  lang: Language;
  onNavigate: (tab: string) => void;
}

export const PrivacyCenter: React.FC<PrivacyCenterProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  const tenets = [
    {
      title: "1. 100% Opt-In Participation",
      desc: "Students choose whether to participate. Voluntary check-ins can be stopped anytime, and students can request immediate deletion of their historical logs.",
      icon: UserCheck
    },
    {
      title: "2. Cryptographic Anonymous Student IDs",
      desc: "All check-ins and graph nodes use synthetic IDs (e.g. CG-1042). Names, roll numbers, hostel rooms, and email addresses are never linked to wellbeing evaluations.",
      icon: KeyRound
    },
    {
      title: "3. Strictly Non-Diagnostic",
      desc: "CampusGuard identifies risk trajectories like sleep deficit and workload spikes. It will never assign medical psychiatric labels, diagnoses, or mental illness tags.",
      icon: HeartHandshake
    },
    {
      title: "4. Zero Invasive Surveillance",
      desc: "No keystroke logging, no background screen recording, no location tracking, and no reading private messages. Only voluntary responses are analyzed.",
      icon: EyeOff
    },
    {
      title: "5. Minimalist Data Collection",
      desc: "We collect only 5 functional indicators: mood, sleep hours, study hours, attendance estimate, and peer connection level. No unnecessary personal data.",
      icon: FileText
    },
    {
      title: "6. Strict Role-Based Access Control",
      desc: "Administrators see campus-wide aggregated metrics. Individual alert details are restricted to designated, sworn student wellness counselors.",
      icon: Lock
    },
    {
      title: "7. Mandatory Human-in-the-Loop Review",
      desc: "Algorithms never trigger automated contact, academic penalties, or exposure. Trained human staff must review and determine supportive next steps.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Institutional Trust Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Your wellbeing data belongs to you.
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
          CampusGuard was designed from day one on the principle that students will only embrace a mental health tool if it is fundamentally safe, transparent, and completely free from punitive surveillance.
        </p>
      </div>

      {/* The 7 Core Tenets Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          The 7 Core Privacy Tenets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tenets.map((tenet, idx) => {
            const Icon = tenet.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{tenet.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tenet.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy Architecture Visual Diagram */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
            System Topology
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">
            Zero-PII Privacy Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            How data flows from student voluntary check-ins to anonymous institutional command views.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Step 1: Client Device</span>
            <p className="font-bold text-white text-sm">Local Storage & Draft Cache</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Check-in drafts are stored locally on the student device. Submissions are queued offline if network drops.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Step 2: Gateway</span>
            <p className="font-bold text-white text-sm">Anonymization Gateway</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              IP addresses and personal credentials are stripped. Only an anonymous hash (e.g. CG-1042) is forwarded.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Step 3: Analytics</span>
            <p className="font-bold text-white text-sm">Heuristic & NetworkX Engine</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Calculates multi-day sleep drops and peer isolation scores. Transparent scoring; zero clinical diagnosis.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Step 4: Review</span>
            <p className="font-bold text-white text-sm">Human Oversight Command</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Aggregated dashboard and anonymous alert review. Interventions require human verification and student consent.
            </p>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Compliant with institutional ethics boards & Indian Digital Personal Data Protection (DPDP) principles
          </span>
          <button
            onClick={() => onNavigate('checkin')}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors"
          >
            Experience Opt-In Flow &rarr;
          </button>
        </div>
      </div>

    </div>
  );
};
