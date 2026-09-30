import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, Zap } from 'lucide-react';

interface AI3DCoreProps {
  onActivate: () => void;
}

export const AI3DCore: React.FC<AI3DCoreProps> = ({ onActivate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Canvas particle background effect around orb
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 360);
    let height = (canvas.height = 360);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      angle: number;
      speed: number;
      color: string;
    }> = [];

    const colors = ['#a855f7', '#06b6d4', '#22c55e', '#ff5500', '#facc15'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: width / 2,
        y: height / 2,
        radius: Math.random() * 2.5 + 1,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.02 + 0.005) * (i % 2 === 0 ? 1 : -1),
        color: colors[i % colors.length]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const baseDistance = isHovered ? 120 : 100;

      particles.forEach((p, idx) => {
        p.angle += p.speed * (isHovered ? 2.5 : 1);
        const dist = baseDistance + Math.sin(p.angle * 3 + idx) * 15;
        const x = centerX + Math.cos(p.angle) * dist;
        const y = centerY + Math.sin(p.angle) * dist;

        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isHovered ? 12 : 6;
        ctx.fill();

        // Connect nearby particles with subtle energy threads
        if (idx % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `${p.color}22`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onClick={onActivate}
      style={{
        position: 'relative',
        width: '360px',
        height: '360px',
        margin: '0 auto',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px'
      }}
      title="Click to trigger Overcomplicated AI Mode"
    >
      {/* Canvas Particle System */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Outer Orbit Rings */}
      <motion.div
        animate={{
          rotate: [0, 360],
          rotateX: mousePos.y * 0.15,
          rotateY: mousePos.x * 0.15
        }}
        transition={{
          rotate: { duration: isHovered ? 6 : 18, repeat: Infinity, ease: 'linear' }
        }}
        style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          border: '2px dashed rgba(168, 85, 247, 0.4)',
          boxShadow: '0 0 25px rgba(168, 85, 247, 0.2)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <motion.div
        animate={{
          rotate: [360, 0],
          rotateX: -mousePos.y * 0.15,
          rotateY: -mousePos.x * 0.15
        }}
        transition={{
          rotate: { duration: isHovered ? 8 : 22, repeat: Infinity, ease: 'linear' }
        }}
        style={{
          position: 'absolute',
          width: '230px',
          height: '230px',
          borderRadius: '50%',
          border: '2px dotted rgba(6, 182, 212, 0.6)',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* Floating Orbiting 3D Icons */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: '310px',
          height: '310px',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className="glass-panel" style={{ padding: '6px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.9)' }}>
            <Brain size={16} color="#fff" />
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translate(-50%, 50%)' }}>
          <div className="glass-panel" style={{ padding: '6px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.9)' }}>
            <Cpu size={16} color="#fff" />
          </div>
        </div>
        <div style={{ position: 'absolute', top: '50%', right: '0', transform: 'translate(50%, -50%)' }}>
          <div className="glass-panel" style={{ padding: '6px', borderRadius: '50%', background: 'rgba(250, 204, 21, 0.9)' }}>
            <Zap size={16} color="#000" />
          </div>
        </div>
      </motion.div>

      {/* Central Interactive Glass Sphere & Glowing Core */}
      <motion.div
        animate={{
          scale: isHovered ? 1.12 : 1,
          rotateX: -mousePos.y * 0.2,
          rotateY: mousePos.x * 0.2
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          position: 'relative',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, rgba(250, 204, 21, 0.9), rgba(168, 85, 247, 0.9) 50%, rgba(6, 182, 212, 0.9) 100%)',
          boxShadow: isHovered
            ? '0 0 60px rgba(168, 85, 247, 0.9), 0 0 100px rgba(6, 182, 212, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.8)'
            : '0 0 35px rgba(168, 85, 247, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          zIndex: 4,
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.4)'
        }}
      >
        <Sparkles size={42} style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.9))' }} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '1px',
            marginTop: '6px',
            textShadow: '0 0 8px rgba(0,0,0,0.8)'
          }}
        >
          {isHovered ? 'ACTIVATE AI' : '3D AI CORE'}
        </span>

        {/* Small Status Ring */}
        <span
          style={{
            position: 'absolute',
            bottom: '-28px',
            background: 'rgba(10, 5, 24, 0.9)',
            border: '1px solid var(--neon-purple)',
            borderRadius: '12px',
            padding: '3px 10px',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--bright-yellow)',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          {isHovered ? '⚡ 6 Intelligence Modes Available' : '🤖 Status: Excessively Animated'}
        </span>
      </motion.div>
    </div>
  );
};
