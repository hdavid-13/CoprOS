// components/SpotlightEffect.js
import { useEffect, useState } from 'react';

export default function SpotlightEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="spotlight"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
        transform: `translate(${position.x - 100}px, ${position.y - 100}px)`,
        zIndex: 9999,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
}