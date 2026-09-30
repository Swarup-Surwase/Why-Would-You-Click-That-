import React from 'react';
import { motion } from 'framer-motion';
import { FileText, X } from 'lucide-react';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'changelog' | 'why' | 'easter';
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({
  isOpen,
  onClose,
  type = 'changelog'
}) => {
  if (!isOpen) return null;

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
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        className="glass-panel"
        style={{
          maxWidth: '650px',
          width: '100%',
          maxHeight: '85vh',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid var(--bright-yellow)',
          boxShadow: '0 0 50px rgba(250, 204, 21, 0.4)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={22} color="var(--bright-yellow)" />
            <h3 style={{ fontSize: '18px' }} className="gradient-text-warning">
              Changelog ({type}) v4.2.0-chaos (500+ Anti-UX Choice Log)
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            background: 'rgba(10, 5, 24, 0.9)',
            border: '1px solid var(--glass-border)',
            borderRadius: '10px',
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            lineHeight: 1.7,
            color: 'var(--bright-yellow)'
          }}
        >
          <p style={{ color: 'var(--neon-green)', fontWeight: 700 }}>[v4.2.0-chaos] — RELEASE NOTES</p>
          <p>• Added magnetic dodge behavior to buttons (buttons now shift 3-8px on cursor proximity).</p>
          <p>• Increased confirmation dialog steps from 2 to 4 required confirmations.</p>
          <p>• Added 6 visually identical progress bars to confuse daily momentum tracking.</p>
          <p>• Implemented 10-dimensional filters inside Search Bar from Hell.</p>
          <p>• Dark mode recalibrated to 87% darkness level (left 1 component illuminated).</p>
          <p>• Labels set to disappear after input focus in registration forms.</p>
          <p>• Form validation messages upgraded to passive-aggressive tone.</p>
          <p>• Added Table with 12 unnecessary columns and hidden action triggers.</p>
          <p>• Over-engineered 3D AI Core with 4 orbiting particle rings.</p>
          <p>• Added 7-click logo trigger easter egg.</p>
          <p>• Added Keyboard shortcut (Cmd+Shift+X) for temporary visual chaos mode.</p>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: '16px',
            alignSelf: 'flex-end',
            background: 'linear-gradient(135deg, var(--neon-purple), var(--bright-yellow))',
            border: 'none',
            color: '#000',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 800
          }}
        >
          Close Log
        </button>
      </motion.div>
    </div>
  );
};
