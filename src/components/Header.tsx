import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Search, 
  Moon, 
  Sun, 
  Flame, 
  Sliders, 
  ChevronRight, 
  Zap,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ChaoticTooltip } from './ChaoticTooltip';
import { toggleAudioMute, getIsMuted } from '../lib/soundEffects';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationClick: () => void;
  onChaosToggle: () => void;
  isChaosActive: boolean;
  onOpenSettings: () => void;
  onOpenChangelog: () => void;
  onOpenWheel: () => void;
  currentNavPath: string[];
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onNotificationClick,
  onChaosToggle,
  isChaosActive,
  onOpenSettings,
  onOpenChangelog,
  onOpenWheel,
  currentNavPath: _currentNavPath,
  onNavigate
}) => {
  const [logoClicks, setLogoClicks] = useState(0);
  const [logoText, setLogoText] = useState("WHY WOULD YOU CLICK THAT?");
  const [themeModal, setThemeModal] = useState(false);
  const [isHyperDark, setIsHyperDark] = useState(false);
  const [isMuted, setIsMuted] = useState(getIsMuted());

  const handleLogoClick = () => {
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);
    if (nextCount >= 7) {
      setLogoText("STOP CLICKING THE LOGO!");
      setTimeout(() => {
        setLogoText("WHY WOULD YOU CLICK THAT?");
        setLogoClicks(0);
      }, 3000);
    }
  };

  const toggleTheme = () => {
    const nextTheme = !isHyperDark;
    setIsHyperDark(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme ? 'hyper-dark' : 'default');
    setThemeModal(true);
  };

  return (
    <>
      <header
        className="glass-panel"
        style={{
          position: 'sticky',
          top: 12,
          left: 12,
          right: 12,
          margin: '0 12px 16px 12px',
          zIndex: 100,
          padding: '12px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {/* Top Row: Logo, Stats, Search, Chaos Toggle, Theme, Notifications */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          {/* Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.div
              whileHover={{ rotate: 180, scale: 1.15 }}
              onClick={handleLogoClick}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-orange))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(168, 85, 247, 0.6)'
              }}
              title="Click 7 times for logo Easter Egg!"
            >
              <Zap size={24} color="#fff" />
            </motion.div>
            <div>
              <h1
                onClick={handleLogoClick}
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  letterSpacing: '-0.03em'
                }}
                className="gradient-text-purple"
              >
                {logoText}
              </h1>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                Everything works. Nothing works the way you expect.
              </p>
            </div>
          </div>

          {/* Fake Status Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <ChaoticTooltip text="AI Engine accuracy re-calibrated every 3 seconds unnecessarily.">
              <div
                style={{
                  background: 'rgba(10, 5, 24, 0.8)',
                  border: '1px solid var(--neon-green)',
                  borderRadius: '20px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--neon-green)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--neon-green)',
                    boxShadow: '0 0 8px var(--neon-green)'
                  }}
                />
                AI Engine: 99.8% Confused
              </div>
            </ChaoticTooltip>

            <ChaoticTooltip text="Version v4.2.0-chaos containing 500+ intentional anti-UX choices. Click to inspect full changelog.">
              <button
                onClick={onOpenChangelog}
                style={{
                  background: 'rgba(250, 204, 21, 0.15)',
                  border: '1px solid var(--bright-yellow)',
                  borderRadius: '20px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--bright-yellow)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                v4.2.0-chaos 📜
              </button>
            </ChaoticTooltip>

            <ChaoticTooltip text="Spin the Wheel of Cognitive Friction for random anti-UX penalties!">
              <button
                onClick={onOpenWheel}
                style={{
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid var(--neon-purple)',
                  borderRadius: '20px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--neon-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Friction Wheel 🎲
              </button>
            </ChaoticTooltip>
          </div>

          {/* Action Bar & Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search Bar Button */}
            <ChaoticTooltip text="Open Search Bar from Hell with 10 absurd filter dimensions.">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSearchClick}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px'
                }}
              >
                <Search size={16} color="var(--electric-blue)" />
                <span>Search from Hell...</span>
                <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                  ⌘K
                </span>
              </motion.button>
            </ChaoticTooltip>

            {/* "Make Everything Worse" Chaos Toggle */}
            <ChaoticTooltip text="Toggle Temporary Visual Chaos & Hue Rotations">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={onChaosToggle}
                style={{
                  background: isChaosActive
                    ? 'linear-gradient(135deg, var(--neon-orange), var(--warning-red))'
                    : 'rgba(255, 85, 0, 0.15)',
                  border: '1px solid var(--neon-orange)',
                  color: isChaosActive ? '#fff' : 'var(--neon-orange)',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Flame size={16} />
                <span>{isChaosActive ? 'CHAOS ACTIVE 🔥' : 'Chaos Mode'}</span>
              </motion.button>
            </ChaoticTooltip>

            {/* Sound Effects Toggle Button */}
            <ChaoticTooltip text={isMuted ? "Sound Muted (Click to enable audio torture)" : "Annoying Sound Effects: ENABLED (Click to mute sound torture)"}>
              <button
                onClick={() => {
                  const muted = toggleAudioMute();
                  setIsMuted(muted);
                }}
                style={{
                  background: isMuted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(239, 68, 68, 0.2)',
                  border: isMuted ? '1px solid var(--glass-border)' : '1px solid var(--warning-red)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isMuted ? 'var(--text-muted)' : 'var(--warning-red)'
                }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </ChaoticTooltip>

            {/* Theme Toggle */}
            <ChaoticTooltip text="Toggle Hyper-Dark Mode experience (with dramatic popups)">
              <button
                onClick={toggleTheme}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--bright-yellow)'
                }}
              >
                {isHyperDark ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </ChaoticTooltip>

            {/* Notifications Button */}
            <ChaoticTooltip text="View 7 non-critical notifications stacking endlessly.">
              <button
                onClick={onNotificationClick}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--electric-blue)',
                  position: 'relative'
                }}
              >
                <Bell size={18} />
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: 'var(--warning-red)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '10px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 8px var(--warning-red)'
                  }}
                >
                  7
                </span>
              </button>
            </ChaoticTooltip>

            {/* Settings Preferences Maze */}
            <ChaoticTooltip text="Open Settings inside Settings inside Settings">
              <button
                onClick={onOpenSettings}
                style={{
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid var(--neon-purple)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--neon-purple)'
                }}
              >
                <Sliders size={18} />
              </button>
            </ChaoticTooltip>
          </div>
        </div>

        {/* Bottom Row: Unnecessary Deep Breadcrumb Navigation Maze */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--text-muted)',
            overflowX: 'auto',
            paddingTop: '6px',
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>Deep Maze:</span>
          {['Home', 'Workspace', 'Workspace Settings', 'Advanced', 'Interface', 'Behavioral Preferences', 'Interaction Configuration', 'Button Behavior'].map((step, idx, arr) => (
            <React.Fragment key={step}>
              <span
                onClick={() => onNavigate(step)}
                style={{
                  cursor: 'pointer',
                  color: idx === arr.length - 1 ? 'var(--electric-blue)' : 'inherit',
                  fontWeight: idx === arr.length - 1 ? 700 : 400,
                  whiteSpace: 'nowrap',
                  textDecoration: idx === arr.length - 1 ? 'underline' : 'none'
                }}
              >
                {step}
              </span>
              {idx < arr.length - 1 && <ChevronRight size={12} color="var(--text-muted)" />}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Theme Transition Modal */}
      {themeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel"
            style={{
              padding: '32px',
              maxWidth: '420px',
              textAlign: 'center',
              border: '2px solid var(--neon-purple)'
            }}
          >
            <Moon size={48} color="var(--neon-purple)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }} className="gradient-text-purple">
              Dark Mode Enabled!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
              Dark Mode is now dramatically darker. Current Darkness Level: <strong>87%</strong>.
              One component has deliberately been left brightly illuminated to preserve bad UX principles.
            </p>
            <button
              onClick={() => setThemeModal(false)}
              style={{
                background: 'linear-gradient(135deg, var(--neon-purple), var(--electric-blue))',
                border: 'none',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: '10px',
                fontWeight: 700
              }}
            >
              Acknowledge Darkness
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};
