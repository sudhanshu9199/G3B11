import React, { useState, useEffect } from 'react';
import { Keyboard, Cpu, Monitor, Sparkles, ArrowRight, Check, Zap } from 'lucide-react';
import { playClickSound, playSignalPulseSound, playSuccessChime, speakText } from '../utils/audio';

export default function ComputerSignalFlow({ soundEnabled, voiceEnabled }) {
  const [activeKey, setActiveKey] = useState(null);
  const [signalStage, setSignalStage] = useState(0); // 0: Idle, 1: Key, 2: Wire, 3: CPU, 4: Screen Action
  const [charPose, setCharPose] = useState('wave'); // 'wave' | 'dance' | 'jump'

  // Trigger data flow sequence
  const triggerSignalFlow = (keyName) => {
    setActiveKey(keyName.toUpperCase());
    setSignalStage(1);
    if (soundEnabled) playClickSound();

    // Stage 2: Signal in wire
    setTimeout(() => {
      setSignalStage(2);
      if (soundEnabled) playSignalPulseSound();
    }, 250);

    // Stage 3: Signal in CPU
    setTimeout(() => {
      setSignalStage(3);
    }, 600);

    // Stage 4: Character displays on monitor
    setTimeout(() => {
      setSignalStage(4);
      setCharPose(keyName.toUpperCase() === 'D' ? 'dance' : 'wave');
      if (soundEnabled) playSuccessChime();

      if (voiceEnabled) {
        speakText(`Event: You pressed the ${keyName.toUpperCase()} key! Action: The signal traveled to the CPU and made Tara appear on the monitor!`, true);
      }
    }, 1000);

    // Reset back to idle after 3.5s
    setTimeout(() => {
      setSignalStage(0);
      setActiveKey(null);
    }, 3800);
  };

  // Real physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if student is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const k = e.key.toUpperCase();
      if (['D', 'A', 'S', 'W', ' '].includes(k)) {
        e.preventDefault();
        triggerSignalFlow(k === ' ' ? 'SPACE' : k);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled, voiceEnabled]);

  return (
    <section id="computer" style={{
      maxWidth: '1240px',
      margin: '0 auto 4rem auto',
      padding: '0 1.5rem'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="pill-badge" style={{
          background: 'rgba(153, 102, 255, 0.15)',
          color: '#C084FC',
          border: '1px solid rgba(153, 102, 255, 0.3)',
          marginBottom: '0.75rem'
        }}>
          <Sparkles size={14} />
          <span>Inside The Computer • Grade 3 CS</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #C084FC 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}>
          How Signals Travel Inside a Computer
        </h2>
        <p style={{
          maxWidth: '720px',
          margin: '0.75rem auto 0 auto',
          color: '#94A3B8',
          fontSize: '1.05rem'
        }}>
          Clicking a mouse or pressing a key sends an <strong>Event Signal</strong> through the wires to the computer's CPU brain, which results in an <strong>Action</strong> on your monitor!
        </p>
      </div>

      {/* Main Interactive Circuit Display */}
      <div className="glass-card" style={{
        padding: '2rem',
        background: 'linear-gradient(180deg, rgba(20, 25, 48, 0.9) 0%, rgba(10, 13, 24, 0.95) 100%)',
        position: 'relative'
      }}>
        {/* Instruction Banner */}
        <div style={{
          background: 'rgba(0, 242, 254, 0.1)',
          border: '1px dashed rgba(0, 242, 254, 0.4)',
          borderRadius: '14px',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <Zap size={20} color="var(--peacock-cyan)" />
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#E2E8F0' }}>
            Interactive Prompt: Press the <strong style={{ color: 'var(--mango-yellow)', textDecoration: 'underline' }}>'D' key</strong> on your physical keyboard, or tap the glowing key below!
          </span>
        </div>

        {/* 3-Stage Hardware Flow (Keyboard -> Wire -> CPU -> Monitor) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          alignItems: 'center',
          gap: '1rem',
          minHeight: '260px',
          overflowX: 'auto',
          padding: '1rem 0'
        }}>
          {/* Station 1: The Keyboard */}
          <div style={{
            background: 'rgba(15, 20, 36, 0.9)',
            borderRadius: '18px',
            padding: '1.5rem',
            border: signalStage === 1 ? '2px solid var(--mango-yellow)' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: signalStage === 1 ? '0 0 25px rgba(255, 183, 3, 0.5)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <Keyboard size={18} color="var(--mango-yellow)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#CBD5E1' }}>1. KEYBOARD</span>
            </div>

            {/* Interactive Keycaps */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem' }}>
              {['W', 'A', 'S', 'D'].map((key) => {
                const isSelected = activeKey === key;
                const isD = key === 'D';
                return (
                  <button
                    key={key}
                    onClick={() => triggerSignalFlow(key)}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      background: isSelected 
                        ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
                        : isD 
                          ? 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)' 
                          : '#1E293B',
                      color: isD || isSelected ? '#1A1001' : '#E2E8F0',
                      fontFamily: 'var(--font-code)',
                      fontWeight: 900,
                      fontSize: '1.15rem',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: isSelected 
                        ? '0 0 15px #10B981, inset 0 2px 2px #fff' 
                        : isD 
                          ? '0 0 18px rgba(255, 183, 3, 0.4), inset 0 2px 2px #fff' 
                          : '0 4px 8px rgba(0,0,0,0.5)',
                      transform: isSelected ? 'scale(0.92) translateY(3px)' : 'scale(1)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: signalStage === 1 ? 'var(--mango-yellow)' : '#94A3B8',
              marginTop: '1rem',
              textAlign: 'center'
            }}>
              {signalStage === 1 ? '⚡ EVENT TRIGGERED!' : 'Tap "D" to Send Signal'}
            </span>
          </div>

          {/* Wire 1: Keyboard to CPU */}
          <div style={{
            width: '60px',
            height: '6px',
            background: '#1E293B',
            borderRadius: '3px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {signalStage >= 2 && (
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '24px',
                background: 'linear-gradient(90deg, #00F2FE 0%, #38BDF8 100%)',
                boxShadow: '0 0 10px #00F2FE',
                borderRadius: '3px',
                animation: 'waterFlowRipple 0.5s linear infinite'
              }} />
            )}
          </div>

          {/* Station 2: The CPU (Central Processing Unit) */}
          <div style={{
            background: 'rgba(15, 20, 36, 0.9)',
            borderRadius: '18px',
            padding: '1.5rem',
            border: signalStage === 3 ? '2px solid #00F2FE' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: signalStage === 3 ? '0 0 30px rgba(0, 242, 254, 0.6)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '150px',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <Cpu size={18} color="var(--peacock-cyan)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#CBD5E1' }}>2. CPU (BRAIN)</span>
            </div>

            {/* Glowing Silicon Chip */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              background: signalStage === 3 
                ? 'radial-gradient(circle, #00F2FE 0%, #1E3A8A 100%)' 
                : 'radial-gradient(circle, #334155 0%, #0F172A 100%)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: signalStage === 3 ? '0 0 25px #00F2FE' : 'none',
              transition: 'all 0.3s ease'
            }}>
              <Zap size={28} color={signalStage === 3 ? '#FFFFFF' : '#64748B'} />
            </div>

            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: signalStage === 3 ? '#00F2FE' : '#94A3B8',
              marginTop: '1rem',
              textAlign: 'center'
            }}>
              {signalStage === 3 ? '⚙️ DECODING EVENT...' : 'Listens for Signal'}
            </span>
          </div>

          {/* Wire 2: CPU to Monitor */}
          <div style={{
            width: '60px',
            height: '6px',
            background: '#1E293B',
            borderRadius: '3px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {signalStage >= 3 && (
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '24px',
                background: 'linear-gradient(90deg, #C084FC 0%, #A855F7 100%)',
                boxShadow: '0 0 10px #C084FC',
                borderRadius: '3px',
                animation: 'waterFlowRipple 0.5s linear infinite'
              }} />
            )}
          </div>

          {/* Station 3: The Monitor (Screen Action) */}
          <div style={{
            background: 'rgba(15, 20, 36, 0.9)',
            borderRadius: '18px',
            padding: '1.5rem',
            border: signalStage === 4 ? '2px solid #10B981' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: signalStage === 4 ? '0 0 35px rgba(16, 185, 129, 0.6)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '160px',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <Monitor size={18} color="#34D399" />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#CBD5E1' }}>3. MONITOR</span>
            </div>

            {/* Screen Bezel */}
            <div style={{
              width: '110px',
              height: '75px',
              background: '#020617',
              borderRadius: '10px',
              border: '2px solid #475569',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {signalStage === 4 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  animation: 'dholBounce 0.6s infinite ease-in-out'
                }}>
                  <span style={{ fontSize: '1.8rem' }}>💃</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#34D399' }}>
                    TARA DANCING!
                  </span>
                </div>
              ) : (
                <div style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 600 }}>
                  Standby...
                </div>
              )}
            </div>

            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: signalStage === 4 ? '#34D399' : '#94A3B8',
              marginTop: '1rem',
              textAlign: 'center'
            }}>
              {signalStage === 4 ? '🎉 ACTION EXECUTED!' : 'Awaiting Output'}
            </span>
          </div>
        </div>

        {/* Dynamic Formula Callout */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          borderRadius: '14px',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--mango-yellow)', fontWeight: 800, fontSize: '0.9rem' }}>
              EVENT: Key '{activeKey || 'D'}' Pressed
            </span>
            <ArrowRight size={16} color="#94A3B8" />
            <span style={{ color: '#00F2FE', fontWeight: 800, fontSize: '0.9rem' }}>
              SIGNAL: Electrical impulse travels to CPU
            </span>
            <ArrowRight size={16} color="#94A3B8" />
            <span style={{ color: '#34D399', fontWeight: 800, fontSize: '0.9rem' }}>
              ACTION: Character dances on Monitor!
            </span>
          </div>

          <div style={{
            fontSize: '0.8rem',
            background: 'rgba(255, 183, 3, 0.15)',
            color: 'var(--mango-yellow)',
            padding: '4px 10px',
            borderRadius: '999px',
            fontWeight: 800
          }}>
            Grade 3 CS Fact: Computers are Event-Driven!
          </div>
        </div>
      </div>
    </section>
  );
}
