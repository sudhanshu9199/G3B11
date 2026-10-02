import React, { useState } from 'react';
import Header from './components/Header';
import TrafficLightHero from './components/TrafficLightHero';
import TriggerSandbox from './components/TriggerSandbox';
import ComputerSignalFlow from './components/ComputerSignalFlow';
import ScratchPlayground from './components/ScratchPlayground';
import LearningChartQuiz from './components/LearningChartQuiz';
import Footer from './components/Footer';
import ConceptGalleryModal from './components/ConceptGalleryModal';
import { Sparkles, ArrowDown, Zap } from 'lucide-react';
import { playClickSound } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState('traffic');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Navigation Header */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
        onOpenGallery={() => setGalleryOpen(true)}
      />

      {/* Hero Welcome Banner */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(0, 242, 254, 0.08) 0%, transparent 100%)',
        padding: '3rem 1.5rem 1.5rem 1.5rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 183, 3, 0.12)',
            color: 'var(--mango-yellow)',
            padding: '5px 16px',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 800,
            marginBottom: '1rem',
            border: '1px solid rgba(255, 183, 3, 0.3)'
          }}>
            <Sparkles size={16} />
            <span>2026 Interactive Grade 3 Computer Science Learning Lab</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '1rem'
          }}>
            Welcome to <span style={{
              background: 'linear-gradient(90deg, #FFB703 0%, #00F2FE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Trigger Time!</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#CBD5E1',
            maxWidth: '680px',
            margin: '0 auto 1.5rem auto',
            lineHeight: 1.6
          }}>
            Discover how <strong>Signals (Events)</strong> make things happen! From traffic lights to school bells and Scratch coding, every action has a trigger.
          </p>

          {/* Quick Jump Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                document.getElementById('traffic')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
                color: '#1A1001',
                fontWeight: 900,
                fontSize: '0.9rem',
                padding: '10px 22px',
                borderRadius: '999px',
                boxShadow: '0 4px 16px rgba(255, 183, 3, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Start Learning Adventure</span>
              <ArrowDown size={16} />
            </button>

            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setGalleryOpen(true);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#F8FAFC',
                fontWeight: 700,
                fontSize: '0.9rem',
                padding: '10px 20px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Zap size={16} color="var(--peacock-cyan)" />
              <span>Explore 3D Concept Renders</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Educational Modules */}
      <main style={{ flex: 1 }}>
        {/* Section 1: The Traffic Light Scrollytelling Hero */}
        <TrafficLightHero soundEnabled={soundEnabled} voiceEnabled={voiceEnabled} />

        {/* Section 2: Real-World Trigger Sandbox */}
        <TriggerSandbox soundEnabled={soundEnabled} voiceEnabled={voiceEnabled} />

        {/* Section 3: Inside the Computer */}
        <ComputerSignalFlow soundEnabled={soundEnabled} voiceEnabled={voiceEnabled} />

        {/* Section 4: The Scratch Block Playground */}
        <ScratchPlayground soundEnabled={soundEnabled} voiceEnabled={voiceEnabled} />

        {/* Section 5: My Learning Chart Knowledge Check */}
        <LearningChartQuiz soundEnabled={soundEnabled} voiceEnabled={voiceEnabled} />
      </main>

      {/* Footer */}
      <Footer onOpenGallery={() => setGalleryOpen(true)} />

      {/* 2026 3D Concept Art Gallery Modal */}
      <ConceptGalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
