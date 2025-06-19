import React, { useRef } from 'react';

const TiltCard = ({ children }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left; // X inside card
    const y = e.clientY - rect.top;  // Y inside card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 50; // max 10deg tilt
    const rotateY = ((x - centerX) / centerX) * -50;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.2s ease',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
