import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { DemoBanner } from './components/DemoBanner';
import { ToastContainer, ToastMessage } from './components/Toast';
import { LandingPage } from './pages/LandingPage';
import { DailyCheckIn } from './pages/DailyCheckIn';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { SocialGraphPage } from './pages/SocialGraphPage';
import { SupportChat } from './pages/SupportChat';
import { ResourcesPage } from './pages/ResourcesPage';
import { PrivacyCenter } from './pages/PrivacyCenter';
import { Shield, Heart, Github } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [lang, setLang] = useState<Language>('en');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      
      {/* Sticky Demo Banner */}
      <DemoBanner 
        lang={lang} 
        onRefreshData={() => {
          // Re-trigger refresh if on admin or student page
          window.dispatchEvent(new Event('demo-data-refreshed'));
        }} 
        onToast={addToast} 
      />

      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onLanguageChange={(newLang) => {
          setLang(newLang);
          addToast(`Language updated to ${newLang.toUpperCase()}`, 'info');
        }}
        onToast={addToast}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage lang={lang} onNavigate={setCurrentTab} />
        )}
        {currentTab === 'checkin' && (
          <DailyCheckIn lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'wellbeing' && (
          <StudentDashboard lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'admin' && (
          <AdminDashboard lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'socialGraph' && (
          <SocialGraphPage lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'support' && (
          <SupportChat lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'resources' && (
          <ResourcesPage lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'privacy' && (
          <PrivacyCenter lang={lang} onNavigate={setCurrentTab} />
        )}
      </main>

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Professional Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 text-white flex items-center justify-center">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900">CampusGuard</span>
            <span>—</span>
            <span className="italic">"Don't wait for students to struggle in silence."</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => setCurrentTab('privacy')}
              className="hover:text-slate-900 transition-colors"
            >
              Privacy Architecture
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('resources')}
              className="hover:text-slate-900 transition-colors"
            >
              Emergency Helplines
            </button>
            <span>•</span>
            <span className="text-slate-400">
              Open-Source MIT License
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
