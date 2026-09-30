import React from 'react';

interface ChaoticTooltipProps {
  text: string;
  children: React.ReactNode;
  delayMs?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const ChaoticTooltip: React.FC<ChaoticTooltipProps> = ({
  text,
  children,
  delayMs = 400,
  position = 'top'
}) => {
  return (
    <div className="tooltip-container" style={{ display: 'inline-flex' }}>
      {children}
      <div 
        className="tooltip-box" 
        style={{ transitionDelay: `${delayMs}ms` }}
        data-position={position}
      >
        {text}
      </div>
    </div>
  );
};
