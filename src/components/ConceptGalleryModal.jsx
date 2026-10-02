import React, { useState } from 'react';
import { X, Sparkles, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function ConceptGalleryModal({ isOpen, onClose, soundEnabled }) {
  if (!isOpen) return null;

  const slides = [
    {
      title: "Scene 1: Traffic Light Scrollytelling Hero",
      subtitle: "Vibrant Indian City Crossroad with School Bus & Auto-Rickshaw",
      image: "/images/hero_traffic_light.jpg",
      concept: "Signal -> Action Analogy",
      explanation: "Grade 3 students learn that the traffic light turning green is an EVENT (Signal) that instructs drivers to perform an ACTION (Go!). Features authentic yellow school bus, auto-rickshaw, and enthusiastic Indian school students.",
      tags: ["2026 Claymorphism", "Scroll-Driven CSS", "Core Web Vitals"]
    },
    {
      title: "Scene 2: Real-World Trigger Sandbox",
      subtitle: "Interactive School Courtyard: Bell, Water Cooler & Hand Dryer",
      image: "/images/triggers_sandbox.jpg",
      concept: "Tactile Real-Life Triggers",
      explanation: "Students interact with 3 floating stations: 1. Ringing the brass bell signals students to go to class. 2. Pushing the water cooler button dispenses cold water into a glass. 3. Waving hands under the sensor blows warm air.",
      tags: ["Tactile Micro-Interactions", "Lottie Vectors", "Web Audio Synth"]
    },
    {
      title: "Scene 3: Inside the Computer & Scratch Studio",
      subtitle: "Physical 'D' Key Triggering a Neon Signal into Tara's Dance",
      image: "/images/scratch_computer_flow.jpg",
      concept: "Computer Events & Scratch Programming",
      explanation: "Pressing the physical 'D' key sends an electrical pulse along the transparent circuit into the CPU. The computer decodes the event and Tara the mascot starts her lively Bhangra celebration dance!",
      tags: ["Scratch 3.0 Logic", "Data Flow Path", "Selective 3D Dance"]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    if (soundEnabled) playClickSound();
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (soundEnabled) playClickSound();
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[currentIndex];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(5, 8, 17, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        maxWidth: '960px',
        width: '100%',
        background: '#13182b',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.2)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={18} color="var(--mango-yellow)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
              2026 Visual Concept Renders & Educational Storyboards
            </h3>
          </div>
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F8FAFC'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.25rem', overflowY: 'auto' }}>
          {/* Main Image Showcase */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            background: '#090d19',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            <img
              src={current.image}
              alt={current.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {/* Prev / Next Floating Arrows */}
            <button
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(10, 14, 26, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(10, 14, 26, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Info Details */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--mango-yellow)' }}>
                  {current.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '2px' }}>
                  {current.subtitle}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {current.tags.map((tag, i) => (
                  <span key={i} style={{
                    background: 'rgba(0, 242, 254, 0.12)',
                    color: '#00F2FE',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(0, 242, 254, 0.3)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '0.75rem', lineHeight: 1.5 }}>
              {current.explanation}
            </p>
          </div>

          {/* Slide Indicator Dots */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            marginTop: '1.25rem'
          }}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setCurrentIndex(idx);
                }}
                style={{
                  width: idx === currentIndex ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '999px',
                  background: idx === currentIndex ? 'var(--mango-yellow)' : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  transition: 'all 0.25s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
