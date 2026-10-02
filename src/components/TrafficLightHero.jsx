import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Volume2, Sparkles, ArrowRight, Car, Compass } from 'lucide-react';
import { playClickSound, playSuccessChime, speakText } from '../utils/audio';

export default function TrafficLightHero({ soundEnabled, voiceEnabled }) {
  // Traffic phase: 'red' | 'yellow' | 'green'
  const [phase, setPhase] = useState('red');
  const [autoDrive, setAutoDrive] = useState(false);

  // Set phase with sound and narration
  const handleSetPhase = (newPhase) => {
    if (soundEnabled) {
      if (newPhase === 'green') {
        playSuccessChime();
      } else {
        playClickSound();
      }
    }
    setPhase(newPhase);

    if (voiceEnabled) {
      if (newPhase === 'red') {
        speakText("The Red light is a signal that tells drivers to STOP!", true);
      } else if (newPhase === 'yellow') {
        speakText("The Yellow light signals drivers to get ready!", true);
      } else if (newPhase === 'green') {
        speakText("The colour change to green is a signal that tells the drivers to GO! Event causes Action!", true);
      }
    }
  };

  // Auto-play demo cycle
  useEffect(() => {
    let timer;
    if (autoDrive) {
      if (phase === 'red') {
        timer = setTimeout(() => handleSetPhase('yellow'), 2500);
      } else if (phase === 'yellow') {
        timer = setTimeout(() => handleSetPhase('green'), 2000);
      } else if (phase === 'green') {
        timer = setTimeout(() => {
          handleSetPhase('red');
          setAutoDrive(false);
        }, 5000);
      }
    }
    return () => clearTimeout(timer);
  }, [autoDrive, phase]);

  return (
    <section id="traffic" style={{
      maxWidth: '1240px',
      margin: '2rem auto 4rem auto',
      padding: '0 1.5rem'
    }}>
      {/* Section Header / Tag */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="pill-badge" style={{
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#F87171',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          marginBottom: '0.75rem'
        }}>
          <Sparkles size={14} />
          <span>Real-World Analogy 1 • Grade 3 CS</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFB703 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}>
          Signals Make Things Happen!
        </h2>
        <p style={{
          maxWidth: '720px',
          margin: '0.75rem auto 0 auto',
          color: '#94A3B8',
          fontSize: '1.05rem'
        }}>
          In our everyday life, things don’t just happen randomly. A <strong>signal</strong> tells us when to take action. Let's explore the traffic light!
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="glass-card" style={{
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(23, 29, 54, 0.8) 0%, rgba(13, 17, 30, 0.95) 100%)'
      }}>
        {/* Top Control Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 700 }}>
              Signal Selector:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleSetPhase('red')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  background: phase === 'red' ? '#EF4444' : 'rgba(239, 68, 68, 0.15)',
                  color: phase === 'red' ? '#FFFFFF' : '#FCA5A5',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  boxShadow: phase === 'red' ? '0 0 15px rgba(239, 68, 68, 0.5)' : 'none'
                }}
              >
                🛑 RED (Stop)
              </button>
              <button
                onClick={() => handleSetPhase('yellow')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  background: phase === 'yellow' ? '#FB8500' : 'rgba(251, 133, 0, 0.15)',
                  color: phase === 'yellow' ? '#FFFFFF' : '#FDBA74',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  border: '1px solid rgba(251, 133, 0, 0.5)',
                  boxShadow: phase === 'yellow' ? '0 0 15px rgba(251, 133, 0, 0.5)' : 'none'
                }}
              >
                ⚠️ YELLOW (Ready)
              </button>
              <button
                onClick={() => handleSetPhase('green')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  background: phase === 'green' ? '#10B981' : 'rgba(16, 185, 129, 0.15)',
                  color: phase === 'green' ? '#FFFFFF' : '#6EE7B7',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  border: '1px solid rgba(16, 185, 129, 0.5)',
                  boxShadow: phase === 'green' ? '0 0 20px rgba(16, 185, 129, 0.6)' : 'none'
                }}
              >
                🟢 GREEN (Go!)
              </button>
            </div>
          </div>

          {/* Auto Cycle Button */}
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setAutoDrive(true);
              handleSetPhase('red');
            }}
            disabled={autoDrive}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '8px 18px',
              borderRadius: '999px',
              background: autoDrive ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #00F2FE 0%, #4361EE 100%)',
              color: autoDrive ? '#94A3B8' : '#050811',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}
          >
            <Play size={15} fill={autoDrive ? 'none' : 'currentColor'} />
            <span>{autoDrive ? 'Auto Simulating...' : 'Play Story Simulation'}</span>
          </button>
        </div>

        {/* The Animated Indian Street Canvas */}
        <div style={{
          position: 'relative',
          height: '380px',
          borderRadius: '16px',
          background: 'linear-gradient(180deg, #1b2838 0%, #202b42 45%, #2a344d 46%, #333d54 50%, #1a1e29 51%, #0f131a 100%)',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* City Skyline Silhouette & Clouds */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '190px',
            pointerEvents: 'none'
          }}>
            {/* Sun / Sky Light */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '60px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFD166 0%, rgba(255, 209, 102, 0) 70%)',
              filter: 'blur(4px)'
            }} />
            
            {/* Friendly Indian School Building Outline */}
            <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '120px', opacity: 0.35 }} preserveAspectRatio="none" viewBox="0 0 1000 120">
              <path d="M0,120 L0,70 L60,70 L60,30 L160,30 L160,70 L220,70 L250,50 L280,70 L340,70 L340,20 L380,0 L420,20 L420,70 L520,70 L520,40 L620,40 L620,70 L720,70 L720,30 L800,30 L800,70 L900,70 L940,40 L980,70 L1000,70 L1000,120 Z" fill="#4B5563" />
            </svg>
          </div>

          {/* Traffic Signal Post (Center Right) */}
          <div style={{
            position: 'absolute',
            top: '30px',
            right: '18%',
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Signal Box */}
            <div style={{
              width: '54px',
              padding: '10px 8px',
              background: '#111827',
              borderRadius: '26px',
              border: '3px solid #374151',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'center'
            }}>
              {/* Red Light */}
              <div
                onClick={() => handleSetPhase('red')}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  background: phase === 'red' ? '#EF4444' : '#450A0A',
                  boxShadow: phase === 'red' ? '0 0 25px #EF4444, inset 0 2px 4px #FECACA' : 'none',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}
              />
              {/* Yellow Light */}
              <div
                onClick={() => handleSetPhase('yellow')}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  background: phase === 'yellow' ? '#FB8500' : '#451A03',
                  boxShadow: phase === 'yellow' ? '0 0 25px #FB8500, inset 0 2px 4px #FED7AA' : 'none',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}
              />
              {/* Green Light */}
              <div
                onClick={() => handleSetPhase('green')}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  background: phase === 'green' ? '#10B981' : '#064E3B',
                  boxShadow: phase === 'green' ? '0 0 35px #10B981, inset 0 2px 6px #A7F3D0' : 'none',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  animation: phase === 'green' ? 'greenTrafficBurst 2s infinite ease-in-out' : 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Signal Pole */}
            <div style={{
              width: '12px',
              height: '140px',
              background: 'linear-gradient(90deg, #374151 0%, #1F2937 100%)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
            }} />
          </div>

          {/* Road Asphalt & Zebra Crossing */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '160px',
            background: '#151922',
            borderTop: '4px solid #F59E0B'
          }}>
            {/* White Dashed Center Lane */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '4px',
              backgroundImage: 'repeating-linear-gradient(90deg, #CBD5E1 0px, #CBD5E1 30px, transparent 30px, transparent 60px)'
            }} />

            {/* Zebra Crossing Stripes near Traffic Light */}
            <div style={{
              position: 'absolute',
              right: '16%',
              top: 0,
              bottom: 0,
              width: '80px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              opacity: 0.8
            }}>
              {[0, 1, 2, 3, 4].map((s) => (
                <div key={s} style={{ height: '14px', width: '100%', background: '#F8FAFC', borderRadius: '2px' }} />
              ))}
            </div>

            {/* Indian School Bus (Yellow with students) */}
            <div style={{
              position: 'absolute',
              bottom: '55px',
              left: phase === 'green' ? '110%' : phase === 'yellow' ? '12%' : '8%',
              transition: phase === 'green' ? 'left 3.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'left 0.8s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 20
            }}>
              {/* Bus SVG */}
              <svg width="220" height="95" viewBox="0 0 220 95" fill="none" style={{
                animation: phase === 'yellow' ? 'gentleFloat 0.3s infinite ease-in-out' : 'none'
              }}>
                {/* Yellow Bus Body */}
                <rect x="10" y="10" width="190" height="60" rx="14" fill="#FFC700" stroke="#B45309" strokeWidth="2.5" />
                <rect x="15" y="48" width="180" height="6" fill="#1E293B" />
                
                {/* School Bus Header */}
                <rect x="40" y="2" width="120" height="14" rx="4" fill="#1E293B" />
                <text x="100" y="12" fill="#FFD700" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  ST. MARY'S HIGH SCHOOL
                </text>

                {/* Windows with smiling Indian student silhouettes */}
                <rect x="25" y="18" width="28" height="24" rx="4" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
                <circle cx="39" cy="30" r="7" fill="#7C2D12" /> {/* Driver */}
                <rect x="62" y="18" width="28" height="24" rx="4" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
                <circle cx="76" cy="30" r="6" fill="#1E293B" /> {/* Student 1 */}
                <rect x="100" y="18" width="28" height="24" rx="4" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
                <circle cx="114" cy="30" r="6" fill="#1E293B" /> {/* Student 2 */}
                <rect x="138" y="18" width="28" height="24" rx="4" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
                <circle cx="152" cy="30" r="6" fill="#1E293B" /> {/* Student 3 */}

                {/* Front Headlight */}
                <rect x="195" y="45" width="8" height="12" rx="3" fill={phase === 'green' ? '#FEF08A' : '#E2E8F0'} />
                
                {/* Wheels */}
                <circle cx="48" cy="70" r="16" fill="#111827" stroke="#6B7280" strokeWidth="4" />
                <circle cx="48" cy="70" r="6" fill="#D1D5DB" />
                <circle cx="160" cy="70" r="16" fill="#111827" stroke="#6B7280" strokeWidth="4" />
                <circle cx="160" cy="70" r="6" fill="#D1D5DB" />
              </svg>

              {/* Status Label above Bus */}
              <div style={{
                position: 'absolute',
                top: '-26px',
                background: phase === 'green' ? '#10B981' : phase === 'yellow' ? '#FB8500' : '#EF4444',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '999px',
                whiteSpace: 'nowrap'
              }}>
                {phase === 'green' ? '🚀 BUS IS DRIVING!' : phase === 'yellow' ? '⏳ ENGINE IDLING...' : '🛑 WAITING AT SIGNAL'}
              </div>
            </div>

            {/* Indian Green Auto-Rickshaw */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: phase === 'green' ? '120%' : phase === 'yellow' ? '32%' : '26%',
              transition: phase === 'green' ? 'left 2.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s' : 'left 0.8s ease',
              zIndex: 22
            }}>
              {/* Auto Rickshaw SVG */}
              <svg width="120" height="70" viewBox="0 0 120 70" fill="none">
                {/* Auto Rickshaw Top Yellow, Lower Green */}
                <path d="M10,48 L15,15 Q25,8 45,8 L95,8 L110,48 Z" fill="#FACC15" />
                <path d="M8,48 L110,48 L105,60 L12,60 Z" fill="#15803D" />
                {/* Windshield */}
                <path d="M75,14 L92,14 L102,44 L75,44 Z" fill="#BAE6FD" opacity="0.8" />
                {/* Driver */}
                <circle cx="85" cy="32" r="7" fill="#78350F" />
                {/* Wheels */}
                <circle cx="28" cy="58" r="10" fill="#000" stroke="#9CA3AF" strokeWidth="2.5" />
                <circle cx="95" cy="58" r="10" fill="#000" stroke="#9CA3AF" strokeWidth="2.5" />
                {/* Text on Auto */}
                <text x="45" y="44" fill="#047857" fontSize="7" fontWeight="bold">CHALO!</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Dynamic Kinetic Typography Explanation */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1.25rem',
          borderRadius: '16px',
          background: phase === 'green' 
            ? 'rgba(16, 185, 129, 0.12)' 
            : phase === 'yellow' 
              ? 'rgba(251, 133, 0, 0.12)' 
              : 'rgba(239, 68, 68, 0.12)',
          border: `1px solid ${
            phase === 'green' 
              ? 'rgba(16, 185, 129, 0.4)' 
              : phase === 'yellow' 
                ? 'rgba(251, 133, 0, 0.4)' 
                : 'rgba(239, 68, 68, 0.4)'
          }`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontWeight: 900,
                fontSize: '1.15rem',
                color: phase === 'green' ? '#34D399' : phase === 'yellow' ? '#FB8500' : '#F87171'
              }}>
                {phase === 'green' 
                  ? '🟢 "The colour change is a signal that tells the drivers what to do!"'
                  : phase === 'yellow'
                    ? '⚠️ "Yellow is the signal that says get ready to go!"'
                    : '🛑 "Red is the signal that tells everyone to stop!"'}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '4px' }}>
              {phase === 'green'
                ? 'When the traffic light turns GREEN (Signal / Event), the drivers step on the gas and go (Action)!'
                : phase === 'yellow'
                  ? 'Drivers prepare their engines and watch for the change.'
                  : 'Drivers keep their feet on the brakes waiting for the signal to change.'}
            </p>
          </div>

          {/* Event -> Action Formula Tag */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '8px 16px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <span style={{ color: 'var(--mango-yellow)', fontWeight: 800, fontSize: '0.85rem' }}>
              EVENT: {phase === 'green' ? 'Green Light' : phase === 'yellow' ? 'Yellow Light' : 'Red Light'}
            </span>
            <ArrowRight size={16} color="#94A3B8" />
            <span style={{ color: '#34D399', fontWeight: 800, fontSize: '0.85rem' }}>
              ACTION: {phase === 'green' ? 'Vehicles Drive Go!' : phase === 'yellow' ? 'Prepare Engine' : 'Vehicles Stop'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
