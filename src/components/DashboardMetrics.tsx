import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  MousePointerClick, 
  BrainCircuit, 
  Activity
} from 'lucide-react';
import { ChaoticTooltip } from './ChaoticTooltip';

export const DashboardMetrics: React.FC = () => {
  const [tiltPos, setTiltPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTiltPos({ x, y });
  };

  const progressBars = [
    { label: 'Learning Progress', value: 63, color: 'var(--neon-purple)', tooltip: 'Primary learning metric... or is it?' },
    { label: "Today's Progress", value: 42, color: 'var(--electric-blue)', tooltip: 'Daily momentum calculation based on click frequency.' },
    { label: 'Module Progress', value: 78, color: 'var(--neon-green)', tooltip: 'Completion status of current over-engineered module.' },
    { label: 'AI Confidence', value: 91, color: 'var(--bright-yellow)', tooltip: 'AI model confidence that you will click the wrong button next.' },
    { label: 'Knowledge Confidence', value: 54, color: 'var(--neon-orange)', tooltip: 'Self-reported understanding versus actual reality.' },
    { label: 'Session Completion', value: 67, color: 'var(--warning-red)', tooltip: 'Percentage of confirmations completed so far.' }
  ];

  const absurdStats = [
    {
      label: 'Productivity Score',
      value: '87.342%',
      change: '+4.12%',
      subtext: 'Calculated using 14 arbitrary variables',
      icon: <Activity size={20} color="var(--neon-purple)" />
    },
    {
      label: 'Button Efficiency',
      value: '63.8%',
      change: '-12.4%',
      subtext: 'Measures how many clicks dodge mouse cursor',
      icon: <MousePointerClick size={20} color="var(--electric-blue)" />
    },
    {
      label: 'Clicks Wasted',
      value: '1,842',
      change: '+240 today',
      subtext: 'Total clicks spent navigating confirmation modals',
      icon: <Clock size={20} color="var(--warning-red)" />
    },
    {
      label: 'Time Saved',
      value: '-14 minutes',
      change: 'Negative gain',
      subtext: 'You have spent 14 more minutes than necessary',
      icon: <TrendingUp size={20} color="var(--bright-yellow)" />
    },
    {
      label: 'Confidence Rating',
      value: 'Maybe',
      change: 'Uncertain',
      subtext: 'AI status: 99.8% Confused',
      icon: <BrainCircuit size={20} color="var(--neon-green)" />
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '24px 0' }}>
      {/* 3D Tilting Card Container for Absurd Stats */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTiltPos({ x: 0, y: 0 })}
        animate={{ rotateX: tiltPos.y, rotateY: tiltPos.x }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ perspective: '1000px' }}
      >
        <div
          className="glass-panel"
          style={{
            padding: '24px',
            background: 'rgba(19, 10, 42, 0.75)',
            border: '1px solid var(--neon-purple)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '18px' }} className="gradient-text-purple">
                Absurd Productivity Dashboard Metrics
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Real-time metrics designed to maximize cognitive friction.
              </p>
            </div>
            <div
              style={{
                background: 'rgba(250, 204, 21, 0.15)',
                border: '1px solid var(--bright-yellow)',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--bright-yellow)'
              }}
            >
              3D Tilt Reactive
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {absurdStats.map((stat, idx) => (
              <ChaoticTooltip key={idx} text={stat.subtext}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(10, 5, 24, 0.6)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.label}</span>
                    {stat.icon}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)' }}>
                    {stat.change}
                  </div>
                </div>
              </ChaoticTooltip>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Progress Bar Confusion Section */}
      <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--electric-blue)' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px' }} className="gradient-text-blue">
            6 Visually Identical Progress Indicators
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Can you guess which progress bar actually measures real task completion?
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {progressBars.map((bar) => (
            <ChaoticTooltip key={bar.label} text={bar.tooltip}>
              <div
                style={{
                  background: 'rgba(10, 5, 24, 0.6)',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{bar.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: bar.color, fontWeight: 700 }}>
                    {bar.value}%
                  </span>
                </div>
                {/* Progress bar container */}
                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    borderRadius: '5px',
                    background: 'rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.value}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${bar.color}, var(--neon-purple))`,
                      borderRadius: '5px',
                      boxShadow: `0 0 10px ${bar.color}`
                    }}
                  />
                </div>
              </div>
            </ChaoticTooltip>
          ))}
        </div>
      </div>
    </div>
  );
};
