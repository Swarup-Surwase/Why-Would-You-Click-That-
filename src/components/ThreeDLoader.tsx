import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Circle, Globe } from 'lucide-react';

interface ThreeDLoaderProps {
  isLoading: boolean;
  onFinished: () => void;
}

export const ThreeDLoader: React.FC<ThreeDLoaderProps> = ({ isLoading, onFinished }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const messages = [
    "Initializing AI intelligence...",
    "Analyzing learner profile...",
    "Optimizing learning path...",
    "Questioning architectural decisions...",
    "Preparing personalized experience...",
    "Almost ready...",
    "Finalizing..."
  ];

  const shapes = ['cube', 'sphere', 'wireframe'];

  useEffect(() => {
    if (!isLoading) {
      setStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= messages.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            onFinished();
          }, 300);
          return prev;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isLoading, onFinished]);

  if (!isLoading) return null;

  const currentShape = shapes[stepIndex % shapes.length];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 2, 12, 0.9)',
        backdropFilter: 'blur(16px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '36px',
          textAlign: 'center',
          border: '2px solid var(--bright-yellow)',
          boxShadow: '0 0 60px rgba(250, 204, 21, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Shape-Shifting 3D Object Animation */}
        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: currentShape === 'sphere' ? '50%' : '16px',
              background: 'linear-gradient(135deg, var(--neon-purple), var(--bright-yellow), var(--electric-blue))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 35px rgba(250, 204, 21, 0.8)'
            }}
          >
            {currentShape === 'cube' && <Box size={48} color="#fff" />}
            {currentShape === 'sphere' && <Circle size={48} color="#fff" />}
            {currentShape === 'wireframe' && <Globe size={48} color="#fff" />}
          </motion.div>
        </div>

        {/* Dramatic Loading Microcopy */}
        <AnimatePresence mode="wait">
          <motion.h4
            key={stepIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ fontSize: '16px', fontWeight: 700 }}
            className="gradient-text-blue"
          >
            {messages[stepIndex]}
          </motion.h4>
        </AnimatePresence>

        <div
          style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}
        >
          <motion.div
            animate={{ width: `${((stepIndex + 1) / messages.length) * 100}%` }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--electric-blue), var(--bright-yellow))'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
