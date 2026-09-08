import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  MessageSquareHeart, 
  BookOpen, 
  Lock, 
  BarChart3, 
  Globe, 
  Wifi, 
  WifiOff, 
  CalendarCheck,
  Share2,
  Menu,
  X
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { offlineService } from '../services/offlineQueue';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onLanguageChange,
  onToast,
}) => {
  const t = translations[lang];
  const [isSimOffline, setIsSimOffline] = useState(offlineService.isSimulatedOffline());
  const [queuedCount, setQueuedCount] = useState(offlineService.getQueuedCheckins().length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleStatus = () => {
      setIsSimOffline(offlineService.isSimulatedOffline());
      setQueuedCount(offlineService.getQueuedCheckins().length);
    };
    window.addEventListener('offline-status-changed', handleStatus);
    window.addEventListener('offline-queue-changed', handleStatus);
    return () => {
      window.removeEventListener('offline-status-changed', handleStatus);
      window.removeEventListener('offline-queue-changed', handleStatus);
    };
  }, []);

  const toggleOffline = async () => {
    const next = !isSimOffline;
    offlineService.setSimulatedOffline(next);
    setIsSimOffline(next);
    if (next) {
      onToast('Simulated Offline Mode Enabled (Rural / Low-Bandwidth test)', 'warning');
    } else {
      onToast('Online connection restored! Synchronizing queue...', 'info');
      const synced = await offlineService.syncQueuedCheckins();
      if (synced > 0) {
        onToast(`Successfully synced ${synced} queued check-in(s)!`, 'success');
      }
    }
  };

  const navItems = [
    { id: 'landing', label: t.navOverview, icon: Activity },
    { id: 'checkin', label: t.navCheckin, icon: CalendarCheck },
    { id: 'wellbeing', label: t.navWellbeing, icon: Activity },
    { id: 'support', label: t.navSupport, icon: MessageSquareHeart },
    { id: 'resources', label: t.navResources, icon: BookOpen },
    { id: 'privacy', label: t.navPrivacy, icon: Lock },
    { id: 'admin', label: t.navAdmin, icon: BarChart3, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={() => onSelectTab('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900">CampusGuard</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                  Early-Warning
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">Opt-In Student Wellbeing</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 shadow-sm'
                      : item.highlight
                      ? 'text-brand-600 hover:bg-brand-50 hover:text-brand-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Low-Bandwidth / Offline Toggle button */}
            <button
              onClick={toggleOffline}
              title={isSimOffline ? 'Click to reconnect online' : 'Click to simulate low-bandwidth offline mode'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isSimOffline
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-emerald-50/70 border-emerald-200 text-emerald-700 hover:bg-emerald-100/80'
              }`}
            >
              {isSimOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span className="hidden sm:inline">Offline Mode</span>
                  {queuedCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded-full font-bold text-[10px]">
                      {queuedCount}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Online</span>
                </>
              )}
            </button>

            {/* Language Selector */}
            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50/80 px-2 py-1">
              <Globe className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
              <select
                aria-label="Language Selector"
                value={lang}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="en">EN (English)</option>
                <option value="hi">HI (हिन्दी)</option>
                <option value="mr">MR (मराठी)</option>
              </select>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-brand-600" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
