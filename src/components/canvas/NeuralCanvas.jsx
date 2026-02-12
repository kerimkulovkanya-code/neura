import { useRef, useEffect, useState } from 'react';

export default function NeuralCanvas({ nodes = [] }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (nodes.length > 0) {
      setAnimationProgress(0);
      const startTime = performance.now();
      const animate = (time) => {
        const progress = Math.min(1, (time - startTime) / 600);
        setAnimationProgress(progress);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [nodes.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    
    const width = container.clientWidth;
    const height = Math.min(400, width * 0.6);
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const scaleX = width / 600;
    const scaleY = height / 400;
    const visibleCount = Math.floor(nodes.length * animationProgress);

    // Draw gradient edges
    for (let i = 1; i < visibleCount; i++) {
      const gradient = ctx.createLinearGradient(
        nodes[i-1].x * scaleX, nodes[i-1].y * scaleY,
        nodes[i].x * scaleX, nodes[i].y * scaleY
      );
      gradient.addColorStop(0, 'rgba(59,130,246,0.1)');
      gradient.addColorStop(1, 'rgba(139,92,246,0.3)');
      
      ctx.beginPath();
      ctx.moveTo(nodes[i-1].x * scaleX, nodes[i-1].y * scaleY);
      ctx.lineTo(nodes[i].x * scaleX, nodes[i].y * scaleY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw nodes with glow and trail
    nodes.slice(0, visibleCount).forEach((node, i) => {
      const x = node.x * scaleX;
      const y = node.y * scaleY;
      const isLatest = i === visibleCount - 1;
      
      if (!isLatest) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(100,116,139,0.5)';
        ctx.fill();
      }

      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = isLatest ? 15 + Math.sin(Date.now() * 0.005) * 5 : 0;
      
      ctx.beginPath();
      ctx.arc(x, y, isLatest ? 6 : 4, 0, 2 * Math.PI);
      
      const gradient = ctx.createRadialGradient(x-1, y-1, 1, x, y, isLatest ? 12 : 6);
      gradient.addColorStop(0, isLatest ? '#3b82f6' : '#94a3b8');
      gradient.addColorStop(1, isLatest ? '#1e40af' : '#64748b');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.shadowBlur = 0;
    });
  }, [nodes, animationProgress]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        className="border-0 rounded-xl w-full h-auto"
      />
    </div>
  );
}