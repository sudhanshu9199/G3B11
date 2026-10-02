import React from 'react';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

export default function Footer({ onOpenGallery }) {
  return (
    <footer style={{
      background: 'rgba(8, 11, 20, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '3rem 1.5rem',
      color: '#94A3B8'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Top Summary Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <BookOpen size={20} color="var(--mango-yellow)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
                Grade 3 Computer Science • Chapter 11 "Trigger Time"
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', maxWidth: '650px', lineHeight: 1.6 }}>
              Key Concept: <strong>Events</strong> act as signals that tell the computer what to do, resulting in <strong>Actions</strong>. Real-world triggers, keyboard inputs, and Scratch programming blocks all follow this core foundational rule.
            </p>
          </div>

          <button
            onClick={onOpenGallery}
            style={{
              padding: '10px 20px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#F8FAFC',
              fontWeight: 800,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={16} color="var(--mango-yellow)" /> View 2026 3D Concept Renders
          </button>
        </div>

        {/* Bottom Credits & Copyright */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          fontSize: '0.8rem'
        }}>
          <p>© 2026 Strawberry School Activity Portal. Designed for Primary Indian School Classrooms.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Built with <Heart size={14} color="#EF4444" fill="#EF4444" /> for curious young minds.
          </p>
        </div>
      </div>
    </footer>
  );
}
