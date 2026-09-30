import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Zap } from 'lucide-react';
import type { NotificationItem } from '../types';

interface NotificationSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  isOpen,
  onClose
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Action completed unsuccessfully.',
      message: 'Your previous success was successful. Everything is technically fine.',
      type: 'absurd',
      timestamp: 'Just now'
    },
    {
      id: '2',
      title: 'AI has finished thinking.',
      message: 'Result: AI is 99.8% confused about your latest click decision.',
      type: 'info',
      timestamp: '1m ago'
    },
    {
      id: '3',
      title: 'Nothing needs your attention.',
      message: 'However, 1 thing needs your attention immediately.',
      type: 'warning',
      timestamp: '3m ago'
    },
    {
      id: '4',
      title: 'Dark Mode is now darker.',
      message: 'Darkness level currently recalibrated to 87%.',
      type: 'success',
      timestamp: '5m ago'
    }
  ]);

  // Periodically add a new absurd notification!
  useEffect(() => {
    const absurdMessages = [
      { title: 'Learning momentum changed.', message: 'Momentum is now reversing towards origin.' },
      { title: 'Button efficiency lowered.', message: 'Buttons are now 3% more evasive on hover.' },
      { title: 'AI insight generated.', message: 'AI concludes you should reconsider your click.' },
      { title: 'Success!', message: 'Something went wrong while being fine.' }
    ];

    const interval = setInterval(() => {
      const randomMsg = absurdMessages[Math.floor(Math.random() * absurdMessages.length)];
      const newNotif: NotificationItem = {
        id: Date.now().toString(),
        title: randomMsg.title,
        message: randomMsg.message,
        type: 'absurd',
        timestamp: 'Just now'
      };
      setNotifications((prev) => [newNotif, ...prev.slice(0, 6)]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <>
      {/* Floating 3D Notification Cards Toast Stack */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 900,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '360px',
          pointerEvents: 'none'
        }}
      >
        <AnimatePresence>
          {notifications.slice(0, 3).map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="glass-panel"
              style={{
                pointerEvents: 'auto',
                padding: '16px',
                border: '1px solid var(--neon-purple)',
                boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4)',
                background: 'rgba(10, 5, 24, 0.92)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Zap size={18} color="var(--bright-yellow)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h5 style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {notif.title}
                    </h5>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {notif.message}
                    </p>
                    <span style={{ fontSize: '10px', color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)', marginTop: '4px', display: 'block' }}>
                      {notif.timestamp}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeNotification(notif.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full Notifications Drawer / Panel Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="glass-panel"
            style={{
              width: '400px',
              height: '100%',
              borderRadius: 0,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              borderLeft: '2px solid var(--neon-purple)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={20} color="var(--bright-yellow)" />
                <h3 style={{ fontSize: '18px' }} className="gradient-text-purple">
                  Notification Center from Hell
                </h3>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Here are your non-critical alerts stacking endlessly.
            </p>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {notifications.map((n) => (
                <div key={n.id} className="glass-panel" style={{ padding: '14px', borderRadius: '10px' }}>
                  <h5 style={{ fontSize: '13px', color: 'var(--bright-yellow)', marginBottom: '4px' }}>
                    {n.title}
                  </h5>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{n.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
