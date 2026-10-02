import React from 'react';
import { Volume2, VolumeX, Mic, MicOff, Sparkles, Image as ImageIcon, Zap } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function Header({ 
  activeSection, 
  setActiveSection, 
  soundEnabled, 
  setSoundEnabled, 
  voiceEnabled, 
  setVoiceEnabled, 
  onOpenGallery 
}) {
  const navItems = [
    { id: 'traffic', label: '🚦 Traffic Signal', desc: 'Hero Story' },
    { id: 'sandbox', label: '🎒 School Triggers', desc: 'Real World' },
    { id: 'computer', label: '💻 Computer Signal', desc: 'Inside PC' },
    { id: 'scratch', label: '🐱 Scratch Studio', desc: 'Dance Code' },
    { id: 'quiz', label: '🏆 Learning Chart', desc: 'Quiz & Certificate' },
  ];

  const handleNavClick = (id) => {
    if (soundEnabled) playClickSound();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 14, 26, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0.75rem 1.5rem',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(255, 183, 3, 0.4)',
            color: '#1a1001'
          }}>
            <Zap size={24} strokeWidth={2.6} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #FFFFFF 0%, #00F2FE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                TRIGGER TIME
              </span>
              <span style={{
                background: 'rgba(255, 183, 3, 0.15)',
                color: 'var(--mango-yellow)',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 183, 3, 0.3)'
              }}>
                Grade 3 CS
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '-2px' }}>
              Chapter 11: Events & Actions (2026 Interactive Lab)
            </p>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #00F2FE 0%, #4361EE 100%)' : 'transparent',
                  color: isActive ? '#050811' : '#CBD5E1',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.8rem',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: isActive ? '0 2px 10px rgba(0, 242, 254, 0.4)' : 'none',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Utility Controls (Sound, Voice, Concept Renders) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Concept Gallery Button */}
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              onOpenGallery();
            }}
            title="View 2026 3D Concept Storyboard Renders"
            style={{
              background: 'rgba(114, 9, 183, 0.25)',
              border: '1px solid rgba(114, 9, 183, 0.5)',
              color: '#D8B4FE',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            <ImageIcon size={15} />
            <span style={{ display: 'inline-block' }}>Art Gallery</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playClickSound();
            }}
            title={soundEnabled ? 'Disable Sound FX' : 'Enable Sound FX'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: soundEnabled ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)',
              border: soundEnabled ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(239, 68, 68, 0.3)',
              color: soundEnabled ? '#34D399' : '#F87171',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Voice Narration Toggle */}
          <button
            onClick={() => {
              const next = !voiceEnabled;
              setVoiceEnabled(next);
              if (soundEnabled) playClickSound();
            }}
            title={voiceEnabled ? 'Disable Teacher Read-Aloud Voice' : 'Enable Teacher Read-Aloud Voice'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: voiceEnabled ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              border: voiceEnabled ? '1px solid rgba(0, 242, 254, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)',
              color: voiceEnabled ? '#00F2FE' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {voiceEnabled ? <Mic size={16} /> : <MicOff size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
