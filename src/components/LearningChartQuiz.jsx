import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, RotateCcw, Sparkles, Printer, ArrowRight, Check, X } from 'lucide-react';
import { playClickSound, playSuccessChime, playErrorSound, speakText } from '../utils/audio';

export default function LearningChartQuiz({ soundEnabled, voiceEnabled }) {
  // 5 Quiz Pairs from the workbook
  const quizPairs = [
    {
      id: 1,
      eventText: 'Waving hand at an automatic hand dryer',
      icon: '💨',
      correctActionId: 'act_1',
      correctActionText: 'The dryer turns on and blows warm air'
    },
    {
      id: 2,
      eventText: 'Pressing the water fountain button',
      icon: '💧',
      correctActionId: 'act_2',
      correctActionText: 'Water dispenses into the tumbler'
    },
    {
      id: 3,
      eventText: 'The school bell rings (Ting-Ting!)',
      icon: '🔔',
      correctActionId: 'act_3',
      correctActionText: 'Students walk into the next classroom'
    },
    {
      id: 4,
      eventText: 'Traffic light turns GREEN at the crossing',
      icon: '🚦',
      correctActionId: 'act_4',
      correctActionText: 'School bus and auto-rickshaw drive forward'
    },
    {
      id: 5,
      eventText: "Pressing the 'D' key in Scratch program",
      icon: '💻',
      correctActionId: 'act_5',
      correctActionText: 'Character performs a joyful Bhangra dance'
    }
  ];

  // Pool of shuffled action choices
  const initialActions = [
    { id: 'act_4', text: 'School bus and auto-rickshaw drive forward' },
    { id: 'act_1', text: 'The dryer turns on and blows warm air' },
    { id: 'act_5', text: 'Character performs a joyful Bhangra dance' },
    { id: 'act_2', text: 'Water dispenses into the tumbler' },
    { id: 'act_3', text: 'Students walk into the next classroom' }
  ];

  // User matches: { [eventId]: actionId }
  const [userMatches, setUserMatches] = useState({});
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [studentName, setStudentName] = useState('Arjun Sharma');
  const [showCertificate, setShowCertificate] = useState(false);

  // Handle matching an event with an action
  const handleAssignAction = (eventId, action) => {
    const pair = quizPairs.find(p => p.id === eventId);
    const isCorrect = pair.correctActionId === action.id;

    if (isCorrect) {
      if (soundEnabled) playSuccessChime();
      const updated = { ...userMatches, [eventId]: action.id };
      setUserMatches(updated);
      setSelectedEventId(null);

      // Check if all matched
      if (Object.keys(updated).length === quizPairs.length) {
        triggerConfettiBlast();
        setShowCertificate(true);
        if (voiceEnabled) {
          speakText("Shabash! Congratulations! You have successfully mastered Events and Actions in Grade 3 Computer Science!", true);
        }
      } else {
        if (voiceEnabled) speakText("Correct match! Excellent job!", true);
      }
    } else {
      if (soundEnabled) playErrorSound();
      if (voiceEnabled) speakText("Oops! Try another action for this event!", true);
    }
  };

  const triggerConfettiBlast = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 350);
    } catch {
      // Confetti fallback
    }
  };

  const handleResetQuiz = () => {
    if (soundEnabled) playClickSound();
    setUserMatches({});
    setSelectedEventId(null);
    setShowCertificate(false);
  };

  const score = Object.keys(userMatches).length;
  const isComplete = score === quizPairs.length;

  return (
    <section id="quiz" style={{
      maxWidth: '1240px',
      margin: '0 auto 5rem auto',
      padding: '0 1.5rem'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="pill-badge" style={{
          background: 'rgba(16, 185, 129, 0.15)',
          color: '#34D399',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          marginBottom: '0.75rem'
        }}>
          <Sparkles size={14} />
          <span>Interactive Workbook Exercise • Grade 3 CS</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #34D399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}>
          "My Learning Chart" Knowledge Check
        </h2>
        <p style={{
          maxWidth: '720px',
          margin: '0.75rem auto 0 auto',
          color: '#94A3B8',
          fontSize: '1.05rem'
        }}>
          Match each real-life <strong>Signal (Event)</strong> on the left with its correct <strong>Result (Action)</strong> on the right!
        </p>

        {/* Score & Reset Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1.25rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '6px 18px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '0.9rem',
            fontWeight: 800,
            color: isComplete ? '#34D399' : 'var(--mango-yellow)'
          }}>
            Score: {score} / {quizPairs.length} Matched
          </div>

          <button
            onClick={handleResetQuiz}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#CBD5E1',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RotateCcw size={14} /> Reset Quiz
          </button>
        </div>
      </div>

      {/* Main Matching Grid */}
      <div className="glass-card" style={{
        padding: '2rem',
        background: 'linear-gradient(180deg, rgba(20, 26, 46, 0.95) 0%, rgba(12, 16, 28, 0.98) 100%)'
      }}>
        {/* Instruction Note */}
        <p style={{
          fontSize: '0.88rem',
          color: '#CBD5E1',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          💡 <em>Tip for Students: Tap an Event on the left (orange), then tap its matching Action on the right (green)!</em>
        </p>

        {/* Match Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {quizPairs.map((pair) => {
            const isMatched = !!userMatches[pair.id];
            const isSelected = selectedEventId === pair.id;

            return (
              <div
                key={pair.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(280px, 1fr) auto minmax(280px, 1fr)',
                  gap: '1rem',
                  alignItems: 'center',
                  background: isMatched ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: isMatched 
                    ? '1px solid rgba(16, 185, 129, 0.4)' 
                    : isSelected 
                      ? '1px solid var(--mango-yellow)' 
                      : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Event Card (Left) */}
                <div
                  onClick={() => {
                    if (isMatched) return;
                    if (soundEnabled) playClickSound();
                    setSelectedEventId(isSelected ? null : pair.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: isMatched ? 'default' : 'pointer',
                    opacity: isMatched ? 0.9 : 1
                  }}
                >
                  <div style={{
                    fontSize: '1.6rem',
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(255, 183, 3, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {pair.icon}
                  </div>
                  <div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: 'var(--mango-yellow)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      Event (Signal)
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>
                      {pair.eventText}
                    </h4>
                  </div>
                </div>

                {/* Connector Arrow */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isMatched ? '#34D399' : '#64748B'
                }}>
                  <ArrowRight size={20} strokeWidth={isMatched ? 3 : 2} />
                </div>

                {/* Action Card Slot (Right) */}
                <div>
                  {isMatched ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(16, 185, 129, 0.18)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      color: '#34D399',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      <span>{pair.correctActionText}</span>
                      <CheckCircle2 size={18} />
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {initialActions.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => {
                            if (!selectedEventId) {
                              // If student clicks action first, auto-select this row
                              handleAssignAction(pair.id, act);
                            } else {
                              handleAssignAction(selectedEventId, act);
                            }
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#CBD5E1',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            textAlign: 'left'
                          }}
                        >
                          {act.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate of Completion Modal / Card */}
      {showCertificate && (
        <div style={{
          marginTop: '2.5rem',
          padding: '2.5rem',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #1c2642 0%, #0d1222 100%)',
          border: '3px solid var(--mango-yellow)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(255, 183, 3, 0.3)',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Certificate Badge Icon */}
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            boxShadow: '0 8px 24px rgba(255, 183, 3, 0.5)'
          }}>
            <Award size={36} color="#1A1001" />
          </div>

          <span style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            color: 'var(--mango-yellow)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Official Certificate of Achievement
          </span>

          <h3 style={{
            fontSize: '2rem',
            fontWeight: 900,
            marginTop: '0.25rem',
            background: 'linear-gradient(90deg, #FFFFFF 0%, #00F2FE 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Junior Event Coder Certificate
          </h3>

          <p style={{ color: '#94A3B8', fontSize: '1rem', marginTop: '0.5rem' }}>
            This certifies that
          </p>

          {/* Student Editable Name Input */}
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px dashed var(--mango-yellow)',
              borderRadius: '12px',
              padding: '8px 20px',
              fontSize: '1.5rem',
              fontWeight: 900,
              fontFamily: 'var(--font-heading)',
              color: '#FFFFFF',
              textAlign: 'center',
              marginTop: '0.5rem',
              maxWidth: '380px',
              width: '100%',
              outline: 'none'
            }}
          />

          <p style={{ color: '#CBD5E1', fontSize: '1rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0 auto' }}>
            Has successfully demonstrated complete mastery of <strong>Events and Actions</strong> in Chapter 11 "Trigger Time" (Grade 3 Computer Science).
          </p>

          {/* Signatures & Seal */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <p style={{ fontFamily: 'cursive', fontSize: '1.2rem', color: 'var(--mango-yellow)' }}>
                Strawberry Learning Lab
              </p>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Curriculum Coordinator</span>
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#34D399' }}>
                Grade 3 CS Department
              </p>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Certified 2026 Curriculum</span>
            </div>
          </div>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            style={{
              marginTop: '2rem',
              padding: '10px 24px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #00F2FE 0%, #4361EE 100%)',
              color: '#050811',
              fontWeight: 800,
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Printer size={16} /> Print or Save Certificate
          </button>
        </div>
      )}
    </section>
  );
}
