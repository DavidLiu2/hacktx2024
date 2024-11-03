// src/components/Tutorial.js
import React, { useState, useEffect } from 'react';
import './Tutorial.css';

const Tutorial = () => {
  const [step, setStep] = useState(0);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [isTutorialComplete, setIsTutorialComplete] = useState(false);

  const messages = [
    "Welcome to our website! I'm here to guide you through the main features.",
    "Use the left and right arrow keys or swipe to navigate through the machines.",
    "Click on a machine to play our AI game.",
    "Enjoy your time here, and let me know if you have any questions.",
    "I'll be waiting down below if you have questions"
  ];

  const handleNext = () => {
    if (step < messages.length - 1) {
      setStep(step + 1);
    } else {
      finishTutorial();
    }
  };

  const finishTutorial = () => {
    setIsOverlayVisible(false);
    setIsTutorialComplete(true);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  const restartTutorial = () => {
    setIsOverlayVisible(true);
    setIsTutorialComplete(false);
    setStep(0);
  };

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenTutorial) {
      setIsOverlayVisible(false);
      setIsTutorialComplete(true);
    }
  }, []);

  return (
    <>
      {isOverlayVisible && (
        <div className="tutorial-overlay" onClick={handleNext}>
          <div className="tutorial-container">
            <div className="character-top-left">
              <img src="/images/character.png" alt="Guide Character" />
            </div>
            <div className="speech-bubble">
              <p>{messages[step]}</p>
              <button onClick={finishTutorial} className="close-button">&times;</button>
            </div>
          </div>
        </div>
      )}
      {isTutorialComplete && (
        <div className="character-bottom-left" onClick={restartTutorial}>
          <img src="/images/character.png" alt="Guide Character" />
        </div>
      )}
    </>
  );
};

export default Tutorial;
