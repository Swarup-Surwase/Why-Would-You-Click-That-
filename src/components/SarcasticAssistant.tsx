import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, RefreshCw } from 'lucide-react';

export const SarcasticAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "Pro Tip: Clicking faster will NOT make the confirmation modal disappear faster.",
    "I noticed you hovered over 'Settings' for 3.2 seconds. Are you having an existential crisis?",
    "Fun fact: 94% of users gave up on this workflow. Will you be part of the majority?",
    "Warning: This button technically functions, but you probably won't like the result.",
    "Congratulations! You spent 4 minutes setting up 14 preferences that do nothing.",
    "Did you know? Our committee of 7 designers spent 6 months deciding to hide this button.",
    "AI status: 99.8% Confused. Human status: 100% Frustrated.",
    "Looking for the 'Save' button? It moved 3 pixels to the left while you were reading this."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="glass-panel"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 950,
        maxWidth: '340px',
        padding: '16px',
        border: '1px solid var(--neon-purple)',
        boxShadow: '0 8px 32px rgba(168, 85, 247, 0.5)',
        background: 'rgba(10, 5, 24, 0.95)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot size={20} color="var(--bright-yellow)" className="animate-float" />
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--bright-yellow)', fontFamily: 'var(--font-mono)' }}>
            Sarcastic AI Voiceover
          </span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setQuoteIndex((prev) => (prev + 1) % quotes.length)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}
            title="Next sarcastic advice"
          >
            <RefreshCw size={12} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={quoteIndex}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          style={{
            fontSize: '12px',
            color: 'var(--text-primary)',
            lineHeight: 1.5,
            fontStyle: 'italic'
          }}
        >
          "{quotes[quoteIndex]}"
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};
