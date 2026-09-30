import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export const FakeLiveSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'dave' | 'user'; text: string }>>([
    { sender: 'dave', text: 'Hi! I am Dave from Anti-UX Support. Have you tried turning off your determination and turning it back on?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const daveResponses = [
    "I can help you find the save button, but first please complete 3 confirmation modals.",
    "Pro Tip: That button is not broken, it just requires extra patience.",
    "I am an automated support bot programmed to offer moral encouragement, not software fixes. You got this!",
    "Our committee of 7 designers has noted your concern and decided to leave it unchanged.",
    "Did you try clicking the button 3 pixels to the left?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = daveResponses[Math.floor(Math.random() * daveResponses.length)];
      setMessages((prev) => [...prev, { sender: 'dave', text: randomResponse }]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '90px',
            zIndex: 920,
            background: 'linear-gradient(135deg, var(--neon-purple), var(--electric-blue))',
            border: '2px solid rgba(255,255,255,0.4)',
            borderRadius: '50%',
            width: '52px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.6)'
          }}
          title="Live Support with Dave from UX"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}

      {/* Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="glass-panel"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 1000,
              width: '340px',
              height: '420px',
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              border: '2px solid var(--electric-blue)',
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
              background: 'rgba(10, 5, 24, 0.95)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)' }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--electric-blue)' }}>
                  Dave from Anti-UX Support
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
                <X size={16} />
              </button>
            </div>

            {/* Message History */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    background: m.sender === 'user' ? 'var(--neon-purple)' : 'rgba(255,255,255,0.08)',
                    color: m.sender === 'user' ? '#fff' : 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    maxWidth: '82%',
                    lineHeight: 1.4
                  }}
                >
                  {m.text}
                </div>
              ))}
              {isTyping && (
                <div style={{ fontSize: '11px', color: 'var(--bright-yellow)', fontStyle: 'italic', fontFamily: 'var(--font-mono)' }}>
                  Dave is typing unhelpful advice...
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Dave for non-help..."
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  background: 'var(--electric-blue)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#000',
                  fontWeight: 700
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
