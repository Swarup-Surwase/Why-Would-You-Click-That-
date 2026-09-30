import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ConfirmationModal } from './components/ConfirmationModal';
import { OverloadedSearch } from './components/OverloadedSearch';
import { DashboardMetrics } from './components/DashboardMetrics';
import { FormNightmare } from './components/FormNightmare';
import { TableNightmare } from './components/TableNightmare';
import { NotificationSystem } from './components/NotificationSystem';
import { SettingsMaze } from './components/SettingsMaze';
import { ThreeDLoader } from './components/ThreeDLoader';
import { UnhelpfulEmptyState, TheatricalErrorState } from './components/UnhelpfulEmptyState';
import { EasterEggModal } from './components/EasterEggModal';
import { SarcasticAssistant } from './components/SarcasticAssistant';
import { FakeLiveSupport } from './components/FakeLiveSupport';
import { WheelOfMisfortune } from './components/WheelOfMisfortune';
import type { AIMode } from './types';
import { Sparkles } from 'lucide-react';
import { playRandomAnnoyingSound } from './lib/soundEffects';

export function App() {
  const [isChaosActive, setIsChaosActive] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLoadingFlow, setIsLoadingFlow] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'forms' | 'table' | 'error'>('dashboard');
  const [currentNavPath, setCurrentNavPath] = useState(['Home', 'Workspace', 'Dashboard']);
  const [lessonActive, setLessonActive] = useState(false);

  // Global Keyboard Shortcut: Cmd+Shift+X or Ctrl+Shift+X toggles Chaos Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'X' || e.key === 'x')) {
        e.preventDefault();
        setIsChaosActive((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Global Listener for annoying sound effects on ANY button click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('button')) {
        playRandomAnnoyingSound();
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleStartLearningFlow = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmationSuccess = () => {
    setIsLoadingFlow(true);
  };

  const handleLoaderFinished = () => {
    setIsLoadingFlow(false);
    setLessonActive(true);
  };

  const handleTriggerAIMode = (_mode: AIMode) => {
    setIsLoadingFlow(true);
  };

  return (
    <div data-chaos={isChaosActive} style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Header Bar */}
      <Header
        onSearchClick={() => setIsSearchOpen(true)}
        onNotificationClick={() => setIsNotifOpen(true)}
        onChaosToggle={() => setIsChaosActive(!isChaosActive)}
        isChaosActive={isChaosActive}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenChangelog={() => setIsChangelogOpen(true)}
        onOpenWheel={() => setIsWheelOpen(true)}
        currentNavPath={currentNavPath}
        onNavigate={(step) => setCurrentNavPath(['Home', 'Workspace', step])}
      />

      {/* Hero Section with Interactive 3D AI Core */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <HeroSection
          onTriggerAIMode={handleTriggerAIMode}
          onStartLearning={handleStartLearningFlow}
        />

        {/* Active Lesson Banner if completed ultimate flow */}
        {lessonActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{
              padding: '20px',
              border: '2px solid var(--neon-green)',
              margin: '20px 0',
              textAlign: 'center',
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
            }}
          >
            <Sparkles size={28} color="var(--neon-green)" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '20px', color: 'var(--neon-green)' }}>
              🎉 Lesson Ready! (After 4 confirmations &amp; 3D loading sequence)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Congratulations on completing a simple task through sheer determination.
            </p>
          </motion.div>
        )}

        {/* Workspace Navigation Tabs (Intentionally Over-complicated) */}
        <div
          className="glass-panel"
          style={{
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            margin: '24px 0 12px 0',
            border: '1px solid var(--glass-border)'
          }}
        >
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
            {[
              { id: 'dashboard', label: 'Actual Dashboard (6 Progress Indicators)' },
              { id: 'forms', label: 'Form Nightmares & Redundant Fields' },
              { id: 'table', label: 'Table with 12 Columns' },
              { id: 'error', label: 'Theatrical Error & Empty States' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  background: activeTab === tab.id
                    ? 'linear-gradient(135deg, var(--neon-purple), var(--electric-blue))'
                    : 'rgba(255,255,255,0.05)',
                  color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid var(--glass-border)',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--bright-yellow)' }}>
            Shortcut: Cmd+Shift+X for Chaos Mode
          </span>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'dashboard' && <DashboardMetrics />}
        {activeTab === 'forms' && <FormNightmare />}
        {activeTab === 'table' && <TableNightmare />}
        {activeTab === 'error' && (
          <div>
            <UnhelpfulEmptyState />
            <TheatricalErrorState />
          </div>
        )}
      </main>

      {/* Modals & Dialogs System */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onSuccess={handleConfirmationSuccess}
      />

      <ThreeDLoader
        isLoading={isLoadingFlow}
        onFinished={handleLoaderFinished}
      />

      <OverloadedSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <NotificationSystem
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />

      <SettingsMaze
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <EasterEggModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />

      <WheelOfMisfortune
        isOpen={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
      />

      {/* Floating Sarcastic Assistant & Dave Live Support */}
      <SarcasticAssistant />
      <FakeLiveSupport />
    </div>
  );
}

export default App;
