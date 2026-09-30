import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { playRandomAnnoyingSound } from '../lib/soundEffects';

interface FrustratingButtonProps {
  initialText: string;
  hoverTextSequence?: string[];
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'ai';
  isDodging?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  tooltipText?: string;
  icon?: React.ReactNode;
}

export const FrustratingButton: React.FC<FrustratingButtonProps> = ({
  initialText,
  hoverTextSequence = [],
  onClick,
  variant = 'primary',
  isDodging = false,
  size = 'md',
  disabled = false,
  tooltipText,
  icon
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(-1);
  const [dodgeOffset, setDodgeOffset] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const loadingMessages = [
    "Preparing action...",
    "Thinking harder...",
    "Questioning decisions...",
    "Almost done..."
  ];

  const handleMouseEnter = () => {
    if (hoverTextSequence.length > 0) {
      setCurrentTextIndex((prev) => (prev + 1) % hoverTextSequence.length);
    }

    if (isDodging) {
      const randomX = (Math.random() - 0.5) * 16;
      const randomY = (Math.random() - 0.5) * 16;
      setDodgeOffset({ x: randomX, y: randomY });
    }
  };

  const handleMouseLeave = () => {
    if (isDodging) {
      setDodgeOffset({ x: 0, y: 0 });
    }
  };

  const handleClick = () => {
    if (disabled || isLoading) return;

    // Play annoying sound effect!
    playRandomAnnoyingSound();

    // Simulate slightly dramatic loading state
    setIsLoading(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingMessages.length - 1) {
          clearInterval(interval);
          setIsLoading(false);
          if (onClick) onClick();
          return 0;
        }
        return prev + 1;
      });
    }, 250);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))',
          border: '1px solid rgba(236, 72, 153, 0.6)',
          boxShadow: '0 4px 20px rgba(168, 85, 247, 0.4)'
        };
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.8), rgba(34, 197, 94, 0.8))',
          border: '1px solid rgba(34, 197, 94, 0.6)',
          boxShadow: '0 4px 20px rgba(6, 182, 212, 0.4)'
        };
      case 'danger':
        return {
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(255, 85, 0, 0.8))',
          border: '1px solid rgba(239, 68, 68, 0.6)',
          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)'
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.8), rgba(255, 85, 0, 0.8))',
          border: '1px solid rgba(250, 204, 21, 0.6)',
          boxShadow: '0 4px 20px rgba(250, 204, 21, 0.4)',
          color: '#000'
        };
      case 'ai':
        return {
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(6, 182, 212, 0.9), rgba(250, 204, 21, 0.9))',
          border: '2px solid rgba(250, 204, 21, 0.8)',
          boxShadow: '0 0 25px rgba(168, 85, 247, 0.6)'
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return { padding: '6px 12px', fontSize: '12px' };
      case 'md': return { padding: '10px 20px', fontSize: '14px' };
      case 'lg': return { padding: '14px 28px', fontSize: '16px' };
      case 'xl': return { padding: '18px 36px', fontSize: '18px' };
    }
  };

  const displayText = isLoading
    ? loadingMessages[loadingStep]
    : currentTextIndex >= 0
    ? hoverTextSequence[currentTextIndex]
    : initialText;

  return (
    <motion.button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
      animate={{
        x: dodgeOffset.x,
        y: dodgeOffset.y,
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.92, scaleX: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        borderRadius: '12px',
        color: variant === 'warning' ? '#0f172a' : '#ffffff',
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1
      }}
      title={tooltipText}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{displayText}</span>
      {isLoading && (
        <span
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            display: 'inline-block',
            animation: 'orbitRotate 0.8s linear infinite'
          }}
        />
      )}
    </motion.button>
  );
};
