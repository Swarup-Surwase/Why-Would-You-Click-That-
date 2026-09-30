import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AI3DCore } from './AI3DCore';
import { FrustratingButton } from './FrustratingButton';
import { ChaoticTooltip } from './ChaoticTooltip';
import type { AIMode } from '../types';

interface HeroSectionProps {
  onTriggerAIMode: (mode: AIMode) => void;
  onStartLearning: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onTriggerAIMode,
  onStartLearning
}) => {
  const [showModeSelector, setShowModeSelector] = useState(false);

  const aiModes: Array<{ id: AIMode; label: string; desc: string; color: string }> = [
    { id: 'quick', label: '1. Quick AI', desc: 'Slightly fast responses with extra friction', color: 'var(--neon-purple)' },
    { id: 'deep', label: '2. Deep AI', desc: 'Over-analyzes your input for 4 extra seconds', color: 'var(--electric-blue)' },
    { id: 'smart', label: '3. Smart AI', desc: 'Answers with passive-aggressive correctness', color: 'var(--bright-yellow)' },
    { id: 'advanced', label: '4. Advanced AI', desc: 'Asks 3 confirmation questions before answering', color: 'var(--neon-green)' },
    { id: 'ultra', label: '5. Ultra AI', desc: 'Applies 14 arbitrary cognitive metrics', color: 'var(--neon-pink)' },
    { id: 'experimental', label: '6. Experimental AI', desc: 'Rotates UI by 2 degrees during response', color: 'var(--warning-red)' }
  ];

  return (
    <section
      style={{
        position: 'relative',
        padding: '40px 20px 60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '24px',
        overflow: 'hidden'
      }}
    >
      {/* Floating 3D Background Decorative Panels */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20px',
          left: '5%',
          width: '180px',
          padding: '12px',
          borderRadius: '12px',
          background: 'rgba(168, 85, 247, 0.12)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          backdropFilter: 'blur(8px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <div style={{ fontSize: '11px', color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)' }}>
          3D Card Depth #1
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700 }}>Floating Perspective</div>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '5%',
          width: '200px',
          padding: '12px',
          borderRadius: '12px',
          background: 'rgba(6, 182, 212, 0.12)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          backdropFilter: 'blur(8px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <div style={{ fontSize: '11px', color: 'var(--electric-blue)', fontFamily: 'var(--font-mono)' }}>
          3D Card Depth #2
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700 }}>Spatial UI Grid</div>
      </motion.div>

      {/* Main Headline & Subtitle */}
      <div style={{ zIndex: 1, maxWidth: '800px' }}>
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid var(--neon-purple)',
            borderRadius: '20px',
            padding: '6px 16px',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--bright-yellow)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}
        >
          <Sparkles size={14} /> 10/10 Premium 3D Visual Polish + Intentionally Terrible UX
        </motion.span>

        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '16px'
          }}
          className="gradient-text-purple"
        >
          Everything works. Nothing works the way you expect.
        </h1>

        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
          Welcome to the world's most over-engineered anti-UX productivity workspace. Every button click initiates a journey of unpredictable micro-interactions.
        </p>
      </div>

      {/* Central Interactive 3D AI Core */}
      <div style={{ zIndex: 2, margin: '10px 0' }}>
        <AI3DCore onActivate={() => setShowModeSelector(true)} />
      </div>

      {/* Frustrating Evasive CTAs */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', zIndex: 2 }}>
        <ChaoticTooltip text="Triggers multi-stage confirmation flow (4 modals).">
          <FrustratingButton
            initialText="Maybe Start"
            hoverTextSequence={['Proceed Anyway', 'Are You Sure?', "Let's Do This?"]}
            onClick={onStartLearning}
            variant="ai"
            size="lg"
            isDodging={true}
          />
        </ChaoticTooltip>

        <ChaoticTooltip text="Opens AI Mode Selection with 6 identical sub-assistants.">
          <FrustratingButton
            initialText="Activate AI Mode"
            hoverTextSequence={['Select AI Engine', 'Which AI?']}
            onClick={() => setShowModeSelector(true)}
            variant="primary"
            size="lg"
          />
        </ChaoticTooltip>
      </div>

      {/* AI Mode Selector Popup Panel */}
      {showModeSelector && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 2, 12, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{
              maxWidth: '650px',
              width: '100%',
              padding: '32px',
              border: '2px solid var(--neon-purple)',
              boxShadow: '0 0 50px rgba(168, 85, 247, 0.5)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Sparkles size={36} color="var(--bright-yellow)" style={{ marginBottom: '8px' }} />
              <h3 style={{ fontSize: '22px' }} className="gradient-text-purple">
                AI Mode Selection (6 Options)
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                All 6 options eventually reach essentially the same assistant, but with different cognitive friction!
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px', marginBottom: '24px' }}>
              {aiModes.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setShowModeSelector(false);
                    onTriggerAIMode(m.id);
                  }}
                  className="glass-panel"
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(10, 5, 24, 0.6)',
                    border: `1px solid ${m.color}`,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <h5 style={{ fontSize: '14px', color: m.color, marginBottom: '4px' }}>{m.label}</h5>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{m.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FrustratingButton
                initialText="Cancel Mode Selection"
                onClick={() => setShowModeSelector(false)}
                variant="secondary"
                size="md"
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
