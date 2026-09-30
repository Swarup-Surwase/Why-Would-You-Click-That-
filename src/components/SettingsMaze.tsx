import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, ShieldAlert, X } from 'lucide-react';
import { FrustratingButton } from './FrustratingButton';

interface SettingsMazeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsMaze: React.FC<SettingsMazeProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Behavior');
  const [nestedModal, setNestedModal] = useState(false);
  const [toggles, setToggles] = useState({
    optimizeBehavior: true,
    enableButtons: true,
    dodgeSpeed: '3px',
    aiInterference: 'Maximum',
    darknessLevel: '87%'
  });

  if (!isOpen) return null;

  const tabs = [
    'General',
    'Appearance',
    'Behavior',
    'Advanced',
    'Very Advanced',
    'Extremely Advanced',
    'Experimental',
    'Experimental Experimental',
    "Things We Shouldn't Change"
  ];

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-panel"
        style={{
          maxWidth: '850px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          border: '2px solid var(--neon-purple)',
          boxShadow: '0 0 50px rgba(168, 85, 247, 0.4)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders size={24} color="var(--neon-purple)" />
            <div>
              <h2 style={{ fontSize: '20px' }} className="gradient-text-purple">
                Settings Preferences-ish
              </h2>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                Location: Settings -&gt; Settings Settings -&gt; Advanced Preferences
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Categories Tab Bar */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '10px',
            marginBottom: '16px',
            borderBottom: '1px solid var(--glass-border)'
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'var(--neon-purple)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--glass-border)',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(10,5,24,0.6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--bright-yellow)', marginBottom: '4px' }}>
                  Optimize interface behavior
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Description: Changes some things.
                </p>
              </div>
              <input
                type="checkbox"
                checked={toggles.optimizeBehavior}
                onChange={(e) => setToggles({ ...toggles, optimizeBehavior: e.target.checked })}
              />
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(10,5,24,0.6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--neon-green)', marginBottom: '4px' }}>
                  Enable buttons
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Allows buttons to respond to click events. (Enabled by default).
                </p>
              </div>
              <input
                type="checkbox"
                checked={toggles.enableButtons}
                onChange={(e) => setToggles({ ...toggles, enableButtons: e.target.checked })}
              />
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(10,5,24,0.6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--electric-blue)', marginBottom: '4px' }}>
                  Nested Preference Trigger
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Opens another modal dialog inside settings ("Where did it go?").
                </p>
              </div>
              <button
                onClick={() => setNestedModal(true)}
                style={{
                  background: 'rgba(6, 182, 212, 0.2)',
                  border: '1px solid var(--electric-blue)',
                  color: 'var(--electric-blue)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700
                }}
              >
                Configure Deep Preferences &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <FrustratingButton
            initialText="Persist Modifications"
            hoverTextSequence={['Save Changes?', 'Probably?']}
            onClick={onClose}
            variant="primary"
            size="md"
          />
        </div>
      </motion.div>

      {/* Nested Settings Modal ("Where did it go?") */}
      {nestedModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="glass-panel"
            style={{ padding: '24px', maxWidth: '400px', textAlign: 'center', border: '2px solid var(--warning-red)' }}
          >
            <ShieldAlert size={36} color="var(--warning-red)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }} className="gradient-text-warning">
              This setting may affect settings.
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Changing this sub-setting will recalibrate 14 irrelevant configuration parameters.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setNestedModal(false)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '8px'
                }}
              >
                Discard Changes?
              </button>
              <button
                onClick={() => setNestedModal(false)}
                style={{
                  background: 'var(--warning-red)',
                  border: 'none',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 700
                }}
              >
                Are you really sure?
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
