import React, { useState, useEffect } from 'react';
import { Flag, Octagon, Play, Sparkles, Music, RefreshCw, Volume2, Plus, Trash2 } from 'lucide-react';
import { 
  playClickSound, 
  startDanceBeat, 
  stopDanceBeat, 
  playSuccessChime, 
  speakText 
} from '../utils/audio';

export default function ScratchPlayground({ soundEnabled, voiceEnabled }) {
  // Available Scratch Blocks in the Palette
  const availableEventBlocks = [
    { id: 'ev_d', type: 'event', label: 'when [ d ] key pressed', key: 'd' },
    { id: 'ev_flag', type: 'event', label: 'when ⚑ clicked', key: 'flag' },
    { id: 'ev_space', type: 'event', label: 'when [ space ] key pressed', key: ' ' },
    { id: 'ev_sprite', type: 'event', label: 'when this sprite clicked', key: 'click' },
  ];

  const availableActionBlocks = [
    { id: 'ac_dance', type: 'action', category: 'looks', label: 'dance "Bhangra Beat"', action: 'dance' },
    { id: 'ac_say', type: 'action', category: 'looks', label: 'say "Namaste, Class!" for 2 secs', action: 'say' },
    { id: 'ac_jump', type: 'action', category: 'motion', label: 'jump high and spin', action: 'jump' },
  ];

  // Canvas snapped script
  const [activeEvent, setActiveEvent] = useState(availableEventBlocks[0]); // Default: when [d] key pressed
  const [activeAction, setActiveAction] = useState(availableActionBlocks[0]); // Default: dance

  // Sprite animation state
  const [spriteState, setSpriteState] = useState('idle'); // 'idle' | 'dancing' | 'talking' | 'jumping'
  const [speechBubble, setSpeechBubble] = useState('');
  const [scriptGlowing, setScriptGlowing] = useState(false);

  // Execute the snapped script
  const runActiveAction = () => {
    setScriptGlowing(true);
    if (soundEnabled) playSuccessChime();

    if (activeAction.action === 'dance') {
      setSpriteState('dancing');
      setSpeechBubble('💃 Nacho! Dancing to the beat!');
      if (soundEnabled) startDanceBeat();
      if (voiceEnabled) speakText("Tara is dancing because you triggered the event!", true);

      setTimeout(() => {
        setSpriteState('idle');
        setSpeechBubble('');
        setScriptGlowing(false);
        stopDanceBeat();
      }, 4500);
    } else if (activeAction.action === 'say') {
      setSpriteState('talking');
      setSpeechBubble('🙏 Namaste, Class! Welcome to Grade 3 CS!');
      if (voiceEnabled) speakText("Namaste, Class! Welcome to Grade 3 Computer Science!", true);

      setTimeout(() => {
        setSpriteState('idle');
        setSpeechBubble('');
        setScriptGlowing(false);
      }, 3500);
    } else if (activeAction.action === 'jump') {
      setSpriteState('jumping');
      setSpeechBubble('⭐ Wheee! Jumping high!');
      if (voiceEnabled) speakText("Wheee! Tara jumped high!", true);

      setTimeout(() => {
        setSpriteState('idle');
        setSpeechBubble('');
        setScriptGlowing(false);
      }, 2500);
    }
  };

  // Keyboard Event Listener for Scratch Stage
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const pressed = e.key.toLowerCase();
      if (activeEvent && activeEvent.key === pressed) {
        e.preventDefault();
        runActiveAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEvent, activeAction, soundEnabled, voiceEnabled]);

  // Clean up dance beats on unmount
  useEffect(() => {
    return () => stopDanceBeat();
  }, []);

  const handleGreenFlagClick = () => {
    if (soundEnabled) playClickSound();
    if (activeEvent && activeEvent.key === 'flag') {
      runActiveAction();
    } else {
      // Friendly feedback if script is bound to another event
      setSpeechBubble(`⚠️ Your script uses "${activeEvent.label}"! Try that event or switch block.`);
      setTimeout(() => setSpeechBubble(''), 3000);
    }
  };

  const handleStopClick = () => {
    if (soundEnabled) playClickSound();
    setSpriteState('idle');
    setSpeechBubble('');
    setScriptGlowing(false);
    stopDanceBeat();
  };

  const handleSpriteClick = () => {
    if (activeEvent && activeEvent.key === 'click') {
      runActiveAction();
    } else {
      if (soundEnabled) playClickSound();
    }
  };

  return (
    <section id="scratch" style={{
      maxWidth: '1240px',
      margin: '0 auto 4rem auto',
      padding: '0 1.5rem'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="pill-badge" style={{
          background: 'rgba(255, 191, 0, 0.15)',
          color: 'var(--scratch-event-yellow)',
          border: '1px solid rgba(255, 191, 0, 0.4)',
          marginBottom: '0.75rem'
        }}>
          <Sparkles size={14} />
          <span>Programming Application • Grade 3 CS</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFBF00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}>
          The Scratch Block Playground
        </h2>
        <p style={{
          maxWidth: '720px',
          margin: '0.75rem auto 0 auto',
          color: '#94A3B8',
          fontSize: '1.05rem'
        }}>
          In Scratch programming, <strong>Yellow Event Blocks</strong> tell the computer when to start, and <strong>Purple Action Blocks</strong> tell the sprite what to do!
        </p>
      </div>

      {/* Split-Screen Studio (Left: Blocks & Script / Right: Scratch Stage) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem',
        alignItems: 'stretch'
      }}>
        {/* Left Panel: Scratch Code Workspace */}
        <div className="glass-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(20, 24, 40, 0.95)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#CBD5E1', marginLeft: '6px' }}>
                  Scratch Block Palette
                </span>
              </div>

              {/* Presets */}
              <button
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setActiveEvent(availableEventBlocks[0]);
                  setActiveAction(availableActionBlocks[0]);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#CBD5E1',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={12} /> Reset Script
              </button>
            </div>

            {/* Block Category Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                1. Select Event Hat Block (Yellow)
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                {availableEventBlocks.map((blk) => {
                  const isCurrent = activeEvent.id === blk.id;
                  return (
                    <div
                      key={blk.id}
                      onClick={() => {
                        if (soundEnabled) playClickSound();
                        setActiveEvent(blk);
                      }}
                      style={{
                        cursor: 'pointer',
                        padding: '10px 16px',
                        background: isCurrent ? 'var(--scratch-event-yellow)' : '#332705',
                        color: isCurrent ? '#2D1A00' : '#FEF08A',
                        borderRadius: '16px 16px 4px 4px',
                        borderBottom: `4px solid ${isCurrent ? '#B45309' : '#78350F'}`,
                        border: isCurrent ? '2px solid #FFF' : '1px solid rgba(255, 191, 0, 0.3)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transform: isCurrent ? 'translateX(6px)' : 'translateX(0)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{blk.label}</span>
                      {isCurrent && <span style={{ fontSize: '0.75rem', fontWeight: 900, background: '#2D1A00', color: '#FFBF00', padding: '2px 8px', borderRadius: '999px' }}>ACTIVE</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Blocks */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                2. Select Action Block (Purple Looks)
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                {availableActionBlocks.map((blk) => {
                  const isCurrent = activeAction.id === blk.id;
                  return (
                    <div
                      key={blk.id}
                      onClick={() => {
                        if (soundEnabled) playClickSound();
                        setActiveAction(blk);
                      }}
                      style={{
                        cursor: 'pointer',
                        padding: '10px 16px',
                        background: isCurrent ? 'var(--scratch-looks-purple)' : '#23153c',
                        color: isCurrent ? '#FFFFFF' : '#E9D5FF',
                        borderRadius: '6px',
                        borderBottom: `4px solid ${isCurrent ? '#6E40C9' : '#4C1D95'}`,
                        border: isCurrent ? '2px solid #FFF' : '1px solid rgba(153, 102, 255, 0.3)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transform: isCurrent ? 'translateX(6px)' : 'translateX(0)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{blk.label}</span>
                      {isCurrent && <span style={{ fontSize: '0.75rem', fontWeight: 900, background: '#FFFFFF', color: '#6E40C9', padding: '2px 8px', borderRadius: '999px' }}>ACTIVE</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Assembled Script Snapped Together */}
          <div style={{
            background: 'rgba(10, 13, 24, 0.7)',
            padding: '1.25rem',
            borderRadius: '14px',
            border: scriptGlowing ? '2px solid #10B981' : '1px dashed rgba(255, 255, 255, 0.2)',
            boxShadow: scriptGlowing ? '0 0 25px rgba(16, 185, 129, 0.5)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
              CURRENT SNAPPED CODE BLOCK:
            </span>

            <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
              {/* Event Block */}
              <div style={{
                background: 'var(--scratch-event-yellow)',
                color: '#2D1A00',
                padding: '10px 16px',
                borderRadius: '14px 14px 4px 4px',
                borderBottom: '4px solid #B45309',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '0.9rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}>
                {activeEvent.label}
              </div>

              {/* Action Block Snapped Below */}
              <div style={{
                background: 'var(--scratch-looks-purple)',
                color: '#FFFFFF',
                padding: '10px 16px',
                borderRadius: '0 0 6px 6px',
                borderBottom: '4px solid #6E40C9',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.9rem',
                marginTop: '-2px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}>
                {activeAction.label}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Scratch Interactive Stage */}
        <div className="glass-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(15, 20, 36, 0.95)'
        }}>
          {/* Stage Controls (Green Flag & Red Stop Button) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Green Flag Button */}
              <button
                onClick={handleGreenFlagClick}
                title="Click Green Flag to Start"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                }}
              >
                <Flag size={18} fill="#fff" />
              </button>

              {/* Red Stop Button */}
              <button
                onClick={handleStopClick}
                title="Stop Animation"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                }}
              >
                <Octagon size={18} fill="#fff" />
              </button>
            </div>

            {/* Stage Status */}
            <div style={{
              background: spriteState === 'dancing' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              color: spriteState === 'dancing' ? '#34D399' : '#94A3B8',
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {spriteState === 'dancing' && <Music size={14} />}
              <span>{spriteState === 'dancing' ? '🎵 BHANGRA DANCE LOOPING' : 'STAGE READY'}</span>
            </div>
          </div>

          {/* The Visual Stage Screen */}
          <div 
            onClick={handleSpriteClick}
            style={{
              height: '320px',
              margin: '1.25rem 0',
              borderRadius: '16px',
              background: 'radial-gradient(circle at 50% 40%, #1f2a48 0%, #0c1120 100%)',
              border: '2px solid #334155',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: activeEvent.key === 'click' ? 'pointer' : 'default'
            }}
          >
            {/* Stage Grid Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />

            {/* Speech Bubble */}
            {speechBubble && (
              <div style={{
                position: 'absolute',
                top: '25px',
                background: '#FFFFFF',
                color: '#0F172A',
                fontWeight: 800,
                fontSize: '0.9rem',
                padding: '8px 16px',
                borderRadius: '14px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                zIndex: 10,
                animation: 'pulseGlow 1s ease-in-out'
              }}>
                {speechBubble}
              </div>
            )}

            {/* 3D Animated Character Mascot: Tara */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: spriteState === 'dancing' 
                ? 'dholBounce 0.45s infinite ease-in-out' 
                : spriteState === 'jumping' 
                  ? 'gentleFloat 0.3s infinite ease-in-out' 
                  : 'gentleFloat 3s infinite ease-in-out',
              transform: spriteState === 'dancing' ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.2s ease'
            }}>
              {/* Tara Mascot Visual (High Detail SVG) */}
              <svg width="140" height="170" viewBox="0 0 140 170" fill="none">
                {/* Cheerful Glow Aura when dancing */}
                {spriteState === 'dancing' && (
                  <circle cx="70" cy="85" r="65" fill="radial-gradient(circle, #FDE047 0%, transparent 70%)" opacity="0.4" />
                )}

                {/* Traditional / School Girl Kurti & Dupatta */}
                <ellipse cx="70" cy="115" rx="32" ry="40" fill="#EA580C" /> {/* Kurti */}
                <path d="M42,95 Q70,120 98,95 L95,135 Q70,150 45,135 Z" fill="#0284C7" /> {/* Blue Skirt/Salwar */}
                <path d="M45,95 Q70,115 95,95" stroke="#FDE047" strokeWidth="4" fill="none" /> {/* Golden border */}

                {/* Arms */}
                {spriteState === 'dancing' ? (
                  <>
                    {/* Raised Bhangra Arms */}
                    <path d="M42,100 Q20,70 30,50" stroke="#FDBA74" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="30" cy="48" r="6" fill="#FDBA74" />
                    <path d="M98,100 Q120,70 110,50" stroke="#FDBA74" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="110" cy="48" r="6" fill="#FDBA74" />
                  </>
                ) : (
                  <>
                    {/* Friendly Rest Arms */}
                    <path d="M42,100 Q30,120 40,135" stroke="#FDBA74" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="40" cy="138" r="6" fill="#FDBA74" />
                    <path d="M98,100 Q110,120 100,135" stroke="#FDBA74" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="100" cy="138" r="6" fill="#FDBA74" />
                  </>
                )}

                {/* Head */}
                <circle cx="70" cy="55" r="26" fill="#FDBA74" />
                {/* Hair Braids / Ponytail */}
                <path d="M44,48 Q70,26 96,48 Q94,30 70,28 Q46,30 44,48 Z" fill="#1E293B" />
                <circle cx="38" cy="62" r="6" fill="#1E293B" />
                <circle cx="102" cy="62" r="6" fill="#1E293B" />
                {/* Bindi */}
                <circle cx="70" cy="46" r="2" fill="#DC2626" />
                {/* Eyes */}
                <circle cx="62" cy="54" r="3.5" fill="#1E293B" />
                <circle cx="78" cy="54" r="3.5" fill="#1E293B" />
                {/* Big Smile */}
                <path d="M62,64 Q70,72 78,64" stroke="#DC2626" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>

              <span style={{
                fontSize: '0.85rem',
                fontWeight: 900,
                color: '#F8FAFC',
                marginTop: '4px',
                background: 'rgba(0,0,0,0.5)',
                padding: '2px 10px',
                borderRadius: '999px'
              }}>
                Tara (Sprite)
              </span>
            </div>

            {/* Dance Floating Musical Notes */}
            {spriteState === 'dancing' && (
              <div style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '1.8rem', animation: 'gentleFloat 1s infinite' }}>🎵</span>
                <span style={{ fontSize: '1.8rem', animation: 'gentleFloat 1.2s infinite 0.2s' }}>✨</span>
                <span style={{ fontSize: '1.8rem', animation: 'gentleFloat 0.9s infinite 0.4s' }}>🎶</span>
                <span style={{ fontSize: '1.8rem', animation: 'gentleFloat 1.1s infinite 0.1s' }}>🥁</span>
              </div>
            )}
          </div>

          {/* Quick Trigger Button */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={runActiveAction}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FFBF00 0%, #FB8500 100%)',
                color: '#1A1001',
                fontWeight: 900,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 18px rgba(255, 191, 0, 0.4)'
              }}
            >
              <Play size={16} fill="currentColor" />
              <span>
                {activeEvent.key === 'd' ? "Press 'D' on Keyboard or Click Here!" : "Trigger Current Script"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
