import React, { useState } from 'react';
import { Bell, Droplets, Wind, Sparkles, CheckCircle2, ArrowRight, Hand } from 'lucide-react';
import { 
  playBellSound, 
  playWaterSplashSound, 
  playDryerWhooshSound, 
  playClickSound, 
  speakText 
} from '../utils/audio';

export default function TriggerSandbox({ soundEnabled, voiceEnabled }) {
  // Active states for each of the 3 triggers
  const [bellActive, setBellActive] = useState(false);
  const [waterActive, setWaterActive] = useState(false);
  const [dryerActive, setDryerActive] = useState(false);

  // Track which ones have been discovered
  const [discovered, setDiscovered] = useState({
    bell: false,
    water: false,
    dryer: false
  });

  // 1. Ring School Bell
  const handleTriggerBell = () => {
    if (soundEnabled) playBellSound();
    setBellActive(true);
    setDiscovered(prev => ({ ...prev, bell: true }));
    if (voiceEnabled) {
      speakText("Event: The school bell rings! Action: Students walk into their classroom!", true);
    }
    setTimeout(() => setBellActive(false), 2600);
  };

  // 2. Press Water Fountain Button
  const handleTriggerWater = () => {
    if (soundEnabled) playWaterSplashSound();
    setWaterActive(true);
    setDiscovered(prev => ({ ...prev, water: true }));
    if (voiceEnabled) {
      speakText("Event: Pressing the push-button! Action: Fresh drinking water flows into the tumbler!", true);
    }
    setTimeout(() => setWaterActive(false), 2400);
  };

  // 3. Wave Hand at Automatic Dryer
  const handleTriggerDryer = () => {
    if (dryerActive) return;
    if (soundEnabled) playDryerWhooshSound();
    setDryerActive(true);
    setDiscovered(prev => ({ ...prev, dryer: true }));
    if (voiceEnabled) {
      speakText("Event: Waving your hand near the sensor! Action: The dryer blows warm air to dry your hands!", true);
    }
    setTimeout(() => setDryerActive(false), 2400);
  };

  const completedCount = Object.values(discovered).filter(Boolean).length;

  return (
    <section id="sandbox" style={{
      maxWidth: '1240px',
      margin: '0 auto 4rem auto',
      padding: '0 1.5rem'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="pill-badge" style={{
          background: 'rgba(0, 242, 254, 0.15)',
          color: 'var(--peacock-cyan)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          marginBottom: '0.75rem'
        }}>
          <Sparkles size={14} />
          <span>Interactive Micro-Interactions • Grade 3 CS</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #00F2FE 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}>
          Real-World "Trigger" Sandbox
        </h2>
        <p style={{
          maxWidth: '720px',
          margin: '0.75rem auto 0 auto',
          color: '#94A3B8',
          fontSize: '1.05rem'
        }}>
          In real life, <strong>Triggers (Events)</strong> cause <strong>Results (Actions)</strong>. Try out these 3 school objects to see what happens!
        </p>

        {/* Progress Tracker Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '6px 16px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <CheckCircle2 size={16} color={completedCount === 3 ? '#10B981' : '#94A3B8'} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: completedCount === 3 ? '#34D399' : '#CBD5E1' }}>
            {completedCount} of 3 Triggers Discovered {completedCount === 3 && '🎉 Great Job!'}
          </span>
        </div>
      </div>

      {/* 3 Sandbox Interactive Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Card 1: School Bell */}
        <div className="glass-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: bellActive ? '2px solid var(--mango-yellow)' : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: bellActive ? '0 0 30px rgba(255, 183, 3, 0.35)' : 'none'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{
                background: 'rgba(255, 183, 3, 0.15)',
                color: 'var(--mango-yellow)',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                1. SCHOOL BELL
              </span>
              {discovered.bell && (
                <span style={{ color: '#34D399', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <CheckCircle2 size={14} /> Explored
                </span>
              )}
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Ring the School Bell
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
              Hover or tap the brass bell to ring it and alert the school!
            </p>

            {/* Interactive Bell Stage */}
            <div 
              onMouseEnter={handleTriggerBell}
              onClick={handleTriggerBell}
              style={{
                height: '200px',
                background: 'radial-gradient(circle, #252e4d 0%, #11162b 100%)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Swinging Bell Graphic */}
              <div style={{
                transformOrigin: 'top center',
                animation: bellActive ? 'bellSwing 0.8s ease-in-out infinite' : 'none'
              }}>
                <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
                  {/* Top Mount */}
                  <rect x="36" y="2" width="8" height="15" rx="3" fill="#6B7280" />
                  {/* Bell Dome */}
                  <path d="M40,15 C20,15 15,45 10,65 C25,72 55,72 70,65 C65,45 60,15 40,15 Z" 
                    fill="url(#brassGrad)" 
                    stroke="#B45309" 
                    strokeWidth="2"
                  />
                  {/* Clapper */}
                  <circle cx="40" cy="74" r="8" fill="#78350F" />
                  <defs>
                    <linearGradient id="brassGrad" x1="10" y1="15" x2="70" y2="70" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FDE047" />
                      <stop offset="0.5" stopColor="#EAB308" />
                      <stop offset="1" stopColor="#B45309" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Sound Wave Rings when active */}
              {bellActive && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    border: '3px solid rgba(255, 183, 3, 0.6)',
                    animation: 'pulseGlow 0.6s infinite ease-out'
                  }} />
                </div>
              )}

              {/* Walking Students Animation */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: bellActive ? '10%' : '-60%',
                transition: 'left 1.8s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '1.3rem' }}>🏃</span>
                <span style={{ fontSize: '1.3rem' }}>🎒</span>
                <span style={{ fontSize: '1.3rem' }}>👧</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#10B981', color: '#fff', padding: '2px 8px', borderRadius: '999px' }}>
                  To Class!
                </span>
              </div>

              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                fontSize: '0.75rem',
                color: '#CBD5E1',
                background: 'rgba(0,0,0,0.5)',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                {bellActive ? '🔔 TING-TING!' : 'Tap / Hover to Ring'}
              </div>
            </div>
          </div>

          {/* Formula Callout */}
          <div style={{
            marginTop: '1.25rem',
            padding: '0.85rem',
            borderRadius: '12px',
            background: bellActive ? 'rgba(255, 183, 3, 0.15)' : 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--mango-yellow)', fontWeight: 800 }}>EVENT: Bell Rings</span>
              <ArrowRight size={14} color="#94A3B8" />
              <span style={{ color: '#34D399', fontWeight: 800 }}>ACTION: Students go to next class</span>
            </div>
          </div>
        </div>

        {/* Card 2: Water Fountain */}
        <div className="glass-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: waterActive ? '2px solid #00F2FE' : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: waterActive ? '0 0 30px rgba(0, 242, 254, 0.35)' : 'none'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{
                background: 'rgba(0, 242, 254, 0.15)',
                color: 'var(--peacock-cyan)',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                2. WATER FOUNTAIN
              </span>
              {discovered.water && (
                <span style={{ color: '#34D399', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <CheckCircle2 size={14} /> Explored
                </span>
              )}
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Water Cooler Button
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
              Click the big push button to dispense fresh drinking water!
            </p>

            {/* Interactive Water Fountain Stage */}
            <div style={{
              height: '200px',
              background: 'radial-gradient(circle, #1a2942 0%, #0d1524 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              {/* Push Button on Machine */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={handleTriggerWater}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: waterActive 
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
                      : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                    border: '4px solid #fff',
                    boxShadow: waterActive 
                      ? '0 2px 5px rgba(0,0,0,0.4), 0 0 20px #10B981' 
                      : '0 8px 18px rgba(239, 68, 68, 0.4), inset 0 3px 5px #FCA5A5',
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    transform: waterActive ? 'scale(0.92) translateY(4px)' : 'scale(1)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  PUSH
                </button>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>
                  {waterActive ? 'Pressed!' : 'Tap Button'}
                </span>
              </div>

              {/* Water Spout & Tumbler */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {/* Spout */}
                <div style={{
                  width: '36px',
                  height: '14px',
                  background: '#94A3B8',
                  borderRadius: '4px',
                  position: 'relative'
                }} />

                {/* Animated Water Stream */}
                <div style={{
                  width: '8px',
                  height: waterActive ? '65px' : '0px',
                  background: 'linear-gradient(180deg, #38BDF8 0%, #00F2FE 100%)',
                  borderRadius: '4px',
                  boxShadow: '0 0 12px #38BDF8',
                  transition: 'height 0.25s ease',
                  opacity: waterActive ? 1 : 0
                }} />

                {/* Stainless Steel Tumbler / Glass */}
                <div style={{
                  width: '50px',
                  height: '65px',
                  background: 'linear-gradient(180deg, #E2E8F0 0%, #94A3B8 100%)',
                  borderRadius: '4px 4px 12px 12px',
                  border: '2px solid #CBD5E1',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Water Filling inside Tumbler */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: waterActive ? '80%' : '15%',
                    background: 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)',
                    transition: 'height 1.8s ease'
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Formula Callout */}
          <div style={{
            marginTop: '1.25rem',
            padding: '0.85rem',
            borderRadius: '12px',
            background: waterActive ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--mango-yellow)', fontWeight: 800 }}>EVENT: Button Pressed</span>
              <ArrowRight size={14} color="#94A3B8" />
              <span style={{ color: '#34D399', fontWeight: 800 }}>ACTION: Water dispenses into tumbler</span>
            </div>
          </div>
        </div>

        {/* Card 3: Hand Dryer */}
        <div className="glass-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: dryerActive ? '2px solid #FB8500' : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: dryerActive ? '0 0 30px rgba(251, 133, 0, 0.35)' : 'none'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{
                background: 'rgba(251, 133, 0, 0.15)',
                color: 'var(--amber-orange)',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                3. AUTOMATIC HAND DRYER
              </span>
              {discovered.dryer && (
                <span style={{ color: '#34D399', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <CheckCircle2 size={14} /> Explored
                </span>
              )}
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Automatic Sensor Dryer
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
              Wave your mouse cursor below the sensor to activate warm air!
            </p>

            {/* Interactive Hand Dryer Stage */}
            <div 
              onMouseMove={handleTriggerDryer}
              onClick={handleTriggerDryer}
              style={{
                height: '200px',
                background: 'radial-gradient(circle, #2d231b 0%, #120e0b 100%)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '20px'
              }}
            >
              {/* Hand Dryer Body */}
              <div style={{
                width: '120px',
                height: '70px',
                background: 'linear-gradient(180deg, #F8FAFC 0%, #CBD5E1 100%)',
                borderRadius: '16px',
                border: '2px solid #94A3B8',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
                position: 'relative'
              }}>
                {/* Optical Sensor LED */}
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: dryerActive ? '#00F2FE' : '#EF4444',
                  boxShadow: dryerActive ? '0 0 12px #00F2FE' : 'none',
                  marginBottom: '6px'
                }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#334155' }}>
                  WARM AIR SENSOR
                </span>
              </div>

              {/* Animated Warm Air Streams */}
              {dryerActive ? (
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '10px'
                }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: '4px',
                        height: '40px',
                        background: 'linear-gradient(180deg, #FB8500 0%, #F59E0B 100%)',
                        borderRadius: '2px',
                        animation: `warmAirFlow 0.6s infinite ${i * 0.15}s ease-in-out`
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div style={{
                  marginTop: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#CBD5E1',
                  fontSize: '0.75rem'
                }}>
                  <Hand size={18} color="var(--mango-yellow)" />
                  <span>Wave cursor here</span>
                </div>
              )}

              {dryerActive && (
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#FB8500',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '3px 10px',
                  borderRadius: '999px'
                }}>
                  💨 WHOOSH! Warm air drying hands!
                </div>
              )}
            </div>
          </div>

          {/* Formula Callout */}
          <div style={{
            marginTop: '1.25rem',
            padding: '0.85rem',
            borderRadius: '12px',
            background: dryerActive ? 'rgba(251, 133, 0, 0.15)' : 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--mango-yellow)', fontWeight: 800 }}>EVENT: Waving Hand</span>
              <ArrowRight size={14} color="#94A3B8" />
              <span style={{ color: '#34D399', fontWeight: 800 }}>ACTION: Dryer turns on & blows air</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
