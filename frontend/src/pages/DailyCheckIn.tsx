import React, { useState, useEffect } from 'react';
import { 
  Smile, 
  Frown, 
  Meh, 
  Moon, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  HeartHandshake, 
  Lock, 
  ShieldCheck, 
  Sparkles,
  AlertTriangle,
  RotateCcw,
  WifiOff
} from 'lucide-react';
import { Language, CheckinSubmission, CheckinResult } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';
import { offlineService } from '../services/offlineQueue';

interface DailyCheckInProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DailyCheckIn: React.FC<DailyCheckInProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];

  // Student identification (anonymized code)
  const studentId = 'CG-1042';

  // Multi-step state (1 to 5)
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<number>(4);
  const [sleepHours, setSleepHours] = useState<number>(7.0);
  const [studyHours, setStudyHours] = useState<number>(6.5);
  const [isolationLevel, setIsolationLevel] = useState<string>('Connected');
  const [attendancePct, setAttendancePct] = useState<number>(85);
  const [journalNote, setJournalNote] = useState<string>('');

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<CheckinResult | null>(null);
  const [isOfflineSaved, setIsOfflineSaved] = useState(false);

  // Restore draft if present
  useEffect(() => {
    const draft = offlineService.getDraft();
    if (draft) {
      if (draft.mood) setMood(draft.mood);
      if (draft.sleep_hours) setSleepHours(draft.sleep_hours);
      if (draft.study_hours) setStudyHours(draft.study_hours);
      if (draft.isolation_level) setIsolationLevel(draft.isolation_level);
      if (draft.attendance_pct) setAttendancePct(draft.attendance_pct);
      if (draft.journal_note) setJournalNote(draft.journal_note);
    }
  }, []);

  // Save draft on change
  const updateDraft = () => {
    offlineService.saveDraft({
      student_id: studentId,
      mood,
      sleep_hours: sleepHours,
      study_hours: studyHours,
      isolation_level: isolationLevel,
      attendance_pct: attendancePct,
      journal_note: journalNote,
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload: CheckinSubmission = {
      student_id: studentId,
      mood,
      sleep_hours: sleepHours,
      study_hours: studyHours,
      isolation_level: isolationLevel,
      attendance_pct: attendancePct,
      journal_note: journalNote.trim() || undefined,
    };

    // Check if offline or simulated offline
    if (!offlineService.isOnline()) {
      offlineService.enqueueCheckin(payload);
      offlineService.clearDraft();
      setIsOfflineSaved(true);
      // Local fallback calculation for immediate user comfort
      setResult({
        score: mood <= 2 || sleepHours < 5 ? 65 : 25,
        level: mood <= 2 || sleepHours < 5 ? 'Medium' : 'Low',
        status_label: mood <= 2 || sleepHours < 5 ? 'Needs Attention' : 'Stable',
        factors: ['Offline local evaluation', 'Sleep & mood logged locally'],
        supportive_recommendation: 'Your check-in is saved securely on your device and will synchronize once you reconnect.',
        is_emergency_triggered: false
      });
      setSubmitting(false);
      onToast('Check-in saved offline! Will auto-sync when online.', 'warning');
      return;
    }

    try {
      const res = await api.submitCheckin(payload);
      offlineService.clearDraft();
      setResult(res);
      setIsOfflineSaved(false);
      onToast('Daily check-in recorded successfully!', 'success');
    } catch (e: any) {
      // If network fails unexpectedly, fallback to offline queue
      offlineService.enqueueCheckin(payload);
      setIsOfflineSaved(true);
      setResult({
        score: 30,
        level: 'Low',
        status_label: 'Stable',
        factors: ['Saved to local offline queue'],
        supportive_recommendation: 'Network unavailable. Your check-in was saved locally.',
        is_emergency_triggered: false
      });
      onToast('Network unavailable: Saved offline.', 'info');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(1);
    setIsOfflineSaved(false);
  };

  const moodOptions = [
    { value: 1, emoji: '😔', label: 'Very Low', desc: 'Drained, exhausted, or overwhelmed' },
    { value: 2, emoji: '🙁', label: 'Low', desc: 'Struggling with stress or fatigue' },
    { value: 3, emoji: '😐', label: 'Okay', desc: 'Managing, but carrying mild pressure' },
    { value: 4, emoji: '🙂', label: 'Good', desc: 'Feeling balanced and in rhythm' },
    { value: 5, emoji: '😊', label: 'Great', desc: 'Energized, motivated, and supported' },
  ];

  const isolationOptions = [
    { value: 'Connected', label: 'Connected', desc: 'Regularly interacting with peers, mentors, or friends' },
    { value: 'Sometimes isolated', label: 'Sometimes isolated', desc: 'Occasional distance from social or study circles' },
    { value: 'Often isolated', label: 'Often isolated', desc: 'Spending most days alone; lacking peer contact' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-10 px-4">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium mb-3">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Anonymous Student Profile: <strong className="text-slate-900">{studentId}</strong></span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t.checkinTitle}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          {t.voluntaryNotice}
        </p>
      </div>

      {/* Result Card State */}
      {result ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl animate-fade-in">
          
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.wellbeingStatus}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-slate-900">
                {result.status_label === 'Stable' && (
                  <span className="text-emerald-700">{t.stable}</span>
                )}
                {result.status_label === 'Needs Attention' && (
                  <span className="text-amber-700">{t.needsAttention}</span>
                )}
                {result.status_label === 'Support Recommended' && (
                  <span className="text-rose-700">{t.supportRecommended}</span>
                )}
              </h2>
            </div>

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl ${
              result.level === 'High' 
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : result.level === 'Medium'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {result.score.toFixed(0)}
              <span className="text-[10px] font-normal text-slate-500 ml-0.5">/100</span>
            </div>
          </div>

          {/* Offline indication if saved locally */}
          {isOfflineSaved && (
            <div className="my-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
              <WifiOff className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{t.offlineQueued}</span>
            </div>
          )}

          {/* Contributing Factors */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Contributing Observations
            </p>
            <div className="flex flex-wrap gap-2">
              {result.factors.map((factor, i) => (
                <span 
                  key={i} 
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium border border-slate-200/80"
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>

          {/* Supportive Recommendation */}
          <div className="mt-6 p-4 rounded-2xl bg-brand-50/60 border border-brand-100 text-slate-800">
            <div className="flex items-center gap-2 mb-1.5 text-brand-700 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Gentle Guidance
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              {result.supportive_recommendation}
            </p>
          </div>

          {/* High Priority Resource trigger */}
          {result.level === 'High' && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Consider speaking with a supportive listener today
              </div>
              <p className="mt-1 text-xs text-rose-800">
                You do not have to navigate heavy weeks alone. Tele-MANAS offers free, confidential support 24x7 at <strong>14416</strong>.
              </p>
              <button
                onClick={() => onNavigate('support')}
                className="mt-3 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
              >
                Talk to Support Assistant
              </button>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Take Another Check-in
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('wellbeing')}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm"
              >
                View 7-Day Trend Charts &rarr;
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[11px] text-slate-400">
              Prototype early-warning heuristic — not a medical diagnostic model.
            </p>
          </div>
        </div>
      ) : (
        /* Multi-Step Flow */
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>Step {step} of 5</span>
              <span>{Math.round((step / 5) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-brand-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Mood */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.step1Question}
              </h2>
              <p className="text-xs text-slate-500">
                Select the card that most closely aligns with your emotional state today.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-4">
                {moodOptions.map((opt) => {
                  const isSelected = mood === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => {
                        setMood(opt.value);
                        updateDraft();
                      }}
                      className={`p-4 rounded-2xl border text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-between ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/50 shadow-sm ring-1 ring-brand-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-3xl sm:text-4xl mb-2">{opt.emoji}</span>
                      <p className="text-xs font-bold text-slate-900">{opt.label}</p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">{opt.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Sleep */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.step2Question}
              </h2>
              <p className="text-xs text-slate-500">
                Quality restorative sleep is one of the most reliable predictors of academic wellbeing.
              </p>

              <div className="my-6 text-center">
                <span className="text-5xl font-extrabold text-slate-900">
                  {sleepHours}
                </span>
                <span className="text-base text-slate-500 ml-1">hours</span>
              </div>

              <input
                type="range"
                min="0"
                max="14"
                step="0.5"
                value={sleepHours}
                onChange={(e) => {
                  setSleepHours(parseFloat(e.target.value));
                  updateDraft();
                }}
                className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              <div className="flex items-center justify-center gap-2 mt-4">
                {[4.0, 5.5, 7.0, 8.5].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setSleepHours(val);
                      updateDraft();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      sleepHours === val
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {val} hrs
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Study / Workload */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.step3Question}
              </h2>
              <p className="text-xs text-slate-500">
                Total hours spent in classes, labs, assignments, and exam preparation in the last 24h.
              </p>

              <div className="my-6 text-center">
                <span className="text-5xl font-extrabold text-slate-900">
                  {studyHours}
                </span>
                <span className="text-base text-slate-500 ml-1">hours</span>
              </div>

              <input
                type="range"
                min="0"
                max="16"
                step="0.5"
                value={studyHours}
                onChange={(e) => {
                  setStudyHours(parseFloat(e.target.value));
                  updateDraft();
                }}
                className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              <div className="flex items-center justify-center gap-2 mt-4">
                {[3.0, 6.0, 8.5, 11.0].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setStudyHours(val);
                      updateDraft();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      studyHours === val
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {val} hrs
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Social Connection */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.step4Question}
              </h2>
              <p className="text-xs text-slate-500">
                Feeling isolated can increase cognitive stress. All responses remain anonymized.
              </p>

              <div className="space-y-3 mt-4">
                {isolationOptions.map((opt) => {
                  const isSelected = isolationLevel === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => {
                        setIsolationLevel(opt.value);
                        updateDraft();
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/50 shadow-sm ring-1 ring-brand-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">{opt.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Attendance & Optional Journal */}
          {step === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.step5Question}
              </h2>
              
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Recent Class Attendance</span>
                  <span className="font-bold text-slate-900">{attendancePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={attendancePct}
                  onChange={(e) => {
                    setAttendancePct(parseInt(e.target.value));
                    updateDraft();
                  }}
                  className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Optional Reflection Note
                </label>
                <textarea
                  rows={3}
                  value={journalNote}
                  onChange={(e) => {
                    setJournalNote(e.target.value);
                    updateDraft();
                  }}
                  placeholder={t.journalPlaceholder}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                ></textarea>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Data Sovereignty:</strong> {t.voluntaryNotice}
                </span>
              </div>
            </div>
          )}

          {/* Flow Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t.prevStep}
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
              >
                {t.nextStep}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                {submitting ? 'Evaluating...' : t.submitCheckin}
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
