// src/App.js
import React, { useRef, useEffect } from 'react';
import MainMachine from './components/MainMachine';
import './App.css';
import Tutorial from './components/Tutorial';

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

  const containerRef = useRef(null);
  const scrollAmount = 500;
  const parallaxSpeed = 0.4;

  useEffect(() => {
    const container = containerRef.current;

    // Set initial scroll position to the middle of the container
    const initialScrollPosition = container.scrollWidth / 2;
    container.scrollLeft = initialScrollPosition;

    const handleScroll = () => {
      container.style.backgroundPosition = `-${container.scrollLeft * parallaxSpeed}px 0`;
    };

    const handleKeyDown = (event) => {
      if (event.repeat) return;

      // Adjust scrollLeft explicitly based on scrollAmount
      if (event.key === 'ArrowRight') {
        container.scrollLeft = Math.min(container.scrollLeft + scrollAmount, container.scrollWidth - container.clientWidth);
      } else if (event.key === 'ArrowLeft') {
        container.scrollLeft = Math.max(container.scrollLeft - scrollAmount, 0);
      }
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollAmount, parallaxSpeed]);

  return (
    <>
      <Tutorial />
      <img src="/images/title.png" alt="Title" className="fixed-header-image" />
      <div className="app-container" ref={containerRef}>
        {minor_images1.map((src, index) => (
          <MainMachine key={`${src}-${index}`} imageSrc={src} />
        ))}
      </div>
    </>
  );
}

export default App;