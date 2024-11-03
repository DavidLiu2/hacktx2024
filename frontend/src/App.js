// src/App.js
import React, { useRef, useEffect } from 'react';
import MinorMachine from './components/MinorMachine';
import MainMachine from './components/MainMachine';
import './App.css';

function App() {
  const minor_images1 = [
    '/images/Asset 1.png',
    '/images/Asset 2.png',
    '/images/Asset 3.png',
    '/images/Asset 4.png',
    '/images/Asset 5.png',
    '/images/Asset 6.png',
    '/images/Asset 7.png',
    '/images/Asset 8.png',
    '/images/Asset 9.png',
    '/images/Asset 10 Main.png',
  ];

  const minor_images2 = [
    
  ];

  const containerRef = useRef(null);
  const scrollAmount = 500; // Adjust scroll increment as needed
  const parallaxSpeed = 0.4; // Adjust this value for faster or slower background speed

  useEffect(() => {
    const container = containerRef.current;

    // Set initial scroll position to the middle of the container
    const initialScrollPosition = container.scrollWidth / 2;
    container.scrollLeft = initialScrollPosition;

    const handleScroll = () => {
      // Apply a multiplier to scrollLeft for the background's parallax speed
      container.style.backgroundPosition = `-${container.scrollLeft * parallaxSpeed}px 0`;
    };

    const handleKeyDown = (event) => {
      if (event.repeat) return;

      if (event.key === 'ArrowRight') {
        container.scrollLeft += scrollAmount;
      } else if (event.key === 'ArrowLeft') {
        container.scrollLeft -= scrollAmount;
      }
    };

    // Attach event listeners
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listeners on unmount
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollAmount, parallaxSpeed]);

  return (
    <div className="app-container" ref={containerRef}>
      {minor_images1.map((src, index) => (
        <MainMachine key={`${src}-${index}`} imageSrc={src} />
      ))}
    </div>
  );
}

export default App;
