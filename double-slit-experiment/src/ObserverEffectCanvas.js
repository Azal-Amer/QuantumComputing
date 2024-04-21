// ObserverEffectCanvas.js

import React, { useRef, useEffect } from 'react';

const ObserverEffectCanvas = ({ points, intensity, measure }) => {
  const canvasRef = useRef(null);
  const dotRadius = 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    if (measure) {
      // If measurement is true, collapse the wave function (no interference pattern)
      drawPhotons(ctx, width, height, points, intensity);
    } 
  }, [points, intensity, measure]);

  function drawPhotons(ctx, width, height, points, intensity) {
    const scale = height/Math.max(...intensity);
    const maxIntensity = Math.max(...intensity);

    ctx.fillStyle = 'blue';

    points.forEach((point, index) => {
      const x = (index / points.length) * width;
      const y = height - intensity[index] * scale; // Invert y-axis for canvas
      const brightness = intensity[index] / maxIntensity; // Normalize brightness
      const dotSize = dotRadius * brightness;

      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  return <canvas ref={canvasRef} width={500} height={200} style={{ backgroundColor: '#fff' }} />;
};

export default ObserverEffectCanvas;
