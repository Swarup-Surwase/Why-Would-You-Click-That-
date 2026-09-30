import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, HelpCircle, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { FrustratingButton } from './FrustratingButton';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title = "Start Learning Session"
}) => {
  const [stage, setStage] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: "Step 1/4: Are you sure?",
      description: "You are about to trigger an action in an anti-UX environment. This action may alter setting parameters across multiple sub-menus.",
      confirmText: "Proceed Anyway",
      cancelText: "Maybe Later",
      icon: <HelpCircle size={36} color="var(--bright-yellow)" />
    },
    {
      title: "Step 2/4: Are you REALLY sure?",
      description: "We noticed you clicked 'Proceed Anyway'. Are you completely, 100% positive this is the intended cognitive pathway?",
      confirmText: "Yes, I Am Certain",
      cancelText: "Let Me Reconsider",
      icon: <AlertCircle size={36} color="var(--neon-orange)" />
    },
    {
      title: "Step 3/4: Verification of Intent",
      description: "Please confirm that you agree that the interface moved 3 pixels prior to your click.",
      confirmText: "I Acknowledge The 3px Shift",
      cancelText: "Dismiss Temporarily",
      icon: <ShieldAlert size={36} color="var(--warning-red)" />
    },
    {
      title: "Step 4/4: Final Verification",
      description: "Your session is ready to commence. Click 'Finalize' to proceed or start over.",
      confirmText: "Finalize & Execute",
      cancelText: "Restart Confirmation Flow",
      icon: <CheckCircle2 size={36} color="var(--neon-green)" />
    }
  ];

  const currentStep = steps[stage];

  const handleNextStage = () => {
    if (stage < steps.length - 1) {
      setStage(stage + 1);
    } else {
      setStage(0);
      onSuccess();
      onClose();
    }
  };

  const handleCancel = () => {
    setStage(0);
    onClose();
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
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="glass-panel"
          style={{
            maxWidth: '500px',
            width: '100%',
            padding: '32px',
            position: 'relative',
            border: '2px solid var(--neon-purple)',
            boxShadow: '0 0 50px rgba(168, 85, 247, 0.5)'
          }}
        >
          {/* Awkward tiny close button in top right corner */}
          <button
            onClick={handleCancel}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--glass-border)',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}
            title="Tiny close button"
          >
            <X size={12} />
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
            {currentStep.icon}

            <h3 style={{ fontSize: '22px', fontWeight: 800 }} className="gradient-text-purple">
              {title}: {currentStep.title}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
              {currentStep.description}
            </p>

            {/* Stage Progress Pills */}
            <div style={{ display: 'flex', gap: '8px', margin: '8px 0' }}>
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '32px',
                    height: '6px',
                    borderRadius: '3px',
                    background: idx === stage
                      ? 'var(--neon-purple)'
                      : idx < stage
                      ? 'var(--neon-green)'
                      : 'rgba(255,255,255,0.1)'
                  }}
                />
              ))}
            </div>

            {/* Misleading / Frustrating Actions */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', marginTop: '12px' }}>
              <FrustratingButton
                initialText={currentStep.cancelText}
                onClick={handleCancel}
                variant="secondary"
                size="md"
              />

              <FrustratingButton
                initialText={currentStep.confirmText}
                onClick={handleNextStage}
                variant={stage === steps.length - 1 ? 'ai' : 'primary'}
                size="md"
                isDodging={stage === 1} // Dodge slightly on step 2!
                icon={<ArrowRight size={16} />}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
