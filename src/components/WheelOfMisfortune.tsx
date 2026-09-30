import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dices, X } from 'lucide-react';
import { FrustratingButton } from './FrustratingButton';

interface WheelOfMisfortuneProps {
  isOpen: boolean;
  onClose: () => void;
  onResult?: (result: string) => void;
}

export const WheelOfMisfortune: React.FC<WheelOfMisfortuneProps> = ({
  isOpen,
  onClose,
  onResult
}) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);

  if (!isOpen) return null;

  const outcomes = [
    "Require 1 Extra Confirmation Modal",
    "Shift Buttons 5 Extra Pixels on Hover",
    "Recalibrate Darkness to 99.9%",
    "Receive 1 Passive-Aggressive Compliment",
    "Add +1,000 Wasted Clicks to Stats",
    "Dave from Support will send unhelpful advice"
  ];

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedOutcome(null);

    const randomRot = 1440 + Math.floor(Math.random() * 360);
    setRotation((prev) => prev + randomRot);

    setTimeout(() => {
      setSpinning(false);
      const chosenIndex = Math.floor(Math.random() * outcomes.length);
      const outcome = outcomes[chosenIndex];
      setSelectedOutcome(outcome);
      if (onResult) onResult(outcome);
    }, 3000);
  };

  return (
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="glass-panel"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '28px',
          textAlign: 'center',
          border: '2px solid var(--bright-yellow)',
          boxShadow: '0 0 50px rgba(250, 204, 21, 0.5)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Dices size={24} color="var(--bright-yellow)" />
            <h3 style={{ fontSize: '20px' }} className="gradient-text-warning">
              Wheel of Cognitive Friction
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Spin the wheel to determine how much extra cognitive friction will be added to your current session!
        </p>

        {/* Spinning Wheel Graphic */}
        <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 20px auto' }}>
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 3, ease: 'easeOut' }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '6px solid var(--neon-purple)',
              background: 'conic-gradient(from 0deg, var(--neon-purple), var(--electric-blue), var(--neon-green), var(--bright-yellow), var(--warning-red), var(--neon-pink), var(--neon-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)'
            }}
          >
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--bg-primary)', border: '2px solid #fff' }} />
          </motion.div>
          {/* Wheel Pointer */}
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '16px solid var(--bright-yellow)',
              zIndex: 10
            }}
          />
        </div>

        {/* Outcome Result Display */}
        {selectedOutcome && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: 'rgba(250, 204, 21, 0.15)',
              border: '1px solid var(--bright-yellow)',
              padding: '12px',
              borderRadius: '10px',
              color: 'var(--bright-yellow)',
              fontSize: '14px',
              fontWeight: 700,
              marginBottom: '20px'
            }}
          >
            🎉 Penalty Selected: {selectedOutcome}
          </motion.div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <FrustratingButton
            initialText={spinning ? "Spinning Wheel..." : "Spin Wheel of Friction"}
            onClick={handleSpin}
            variant="warning"
            size="md"
            disabled={spinning}
          />
        </div>
      </motion.div>
    </div>
  );
};
