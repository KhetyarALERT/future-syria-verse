
import React, { useRef, useEffect, useState } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';

interface VirtualOfficeProps {
  onClose: () => void;
}

const VirtualOffice: React.FC<VirtualOfficeProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const mouseRef = useRef({ isDown: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Office elements with 3D-like properties
    const elements = [
      { type: 'desk', x: 200, y: 150, width: 120, height: 60, depth: 40, color: '#8B4513' },
      { type: 'chair', x: 220, y: 120, width: 40, height: 50, depth: 40, color: '#2F4F4F' },
      { type: 'monitor', x: 210, y: 130, width: 80, height: 50, depth: 5, color: '#000000' },
      { type: 'bookshelf', x: 50, y: 80, width: 80, height: 150, depth: 30, color: '#654321' },
      { type: 'plant', x: 350, y: 180, width: 30, height: 60, depth: 30, color: '#228B22' },
      { type: 'window', x: 400, y: 50, width: 100, height: 80, depth: 5, color: '#87CEEB' },
      { type: 'coffee', x: 180, y: 140, width: 15, height: 20, depth: 15, color: '#8B4513' },
    ];

    const drawElement = (element: any, offsetX = 0, offsetY = 0) => {
      const { x, y, width, height, depth, color, type } = element;
      const adjustedX = x + offsetX;
      const adjustedY = y + offsetY;

      // Simple 3D effect
      ctx.fillStyle = color;
      ctx.fillRect(adjustedX, adjustedY, width, height);

      // Add depth/shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(adjustedX + depth/2, adjustedY + depth/2, width, height);

      // Draw main object
      ctx.fillStyle = color;
      ctx.fillRect(adjustedX, adjustedY, width, height);

      // Add details based on type
      switch (type) {
        case 'monitor':
          ctx.fillStyle = '#4169E1';
          ctx.fillRect(adjustedX + 5, adjustedY + 5, width - 10, height - 10);
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '12px Arial';
          ctx.fillText('Code', adjustedX + 20, adjustedY + 25);
          break;
        case 'plant':
          ctx.fillStyle = '#32CD32';
          ctx.beginPath();
          ctx.arc(adjustedX + width/2, adjustedY, width/2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'window':
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.strokeRect(adjustedX, adjustedY, width, height);
          ctx.beginPath();
          ctx.moveTo(adjustedX + width/2, adjustedY);
          ctx.lineTo(adjustedX + width/2, adjustedY + height);
          ctx.moveTo(adjustedX, adjustedY + height/2);
          ctx.lineTo(adjustedX + width, adjustedY + height/2);
          ctx.stroke();
          break;
      }
    };

    const animate = () => {
      if (!isPlaying) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#f0f8ff');
      gradient.addColorStop(1, '#e6f3ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floor
      ctx.fillStyle = '#D2B48C';
      ctx.fillRect(0, 250, canvas.width, canvas.height - 250);

      // Apply rotation effects
      const offsetX = Math.sin(rotation.y * 0.01) * 5;
      const offsetY = Math.sin(rotation.x * 0.01) * 3;

      // Draw office elements
      elements.forEach(element => {
        drawElement(element, offsetX, offsetY);
      });

      // Add floating particles for ambiance
      const time = Date.now() * 0.001;
      for (let i = 0; i < 10; i++) {
        const x = 50 + (i * 45) + Math.sin(time + i) * 20;
        const y = 50 + Math.cos(time + i * 0.5) * 30;
        ctx.fillStyle = `rgba(173, 216, 230, ${0.3 + Math.sin(time + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update rotation for auto-animation
      if (isPlaying && !mouseRef.current.isDown) {
        setRotation(prev => ({
          x: prev.x + 0.5,
          y: prev.y + 0.3
        }));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, rotation]);

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseRef.current.isDown = true;
    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseRef.current.isDown) return;

    const deltaX = e.clientX - mouseRef.current.lastX;
    const deltaY = e.clientY - mouseRef.current.lastY;

    setRotation(prev => ({
      x: prev.x + deltaY,
      y: prev.y + deltaX
    }));

    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
  };

  const handleReset = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Virtual Office Tour</h2>
            <p className="text-gray-600 dark:text-gray-300">Explore our digital workspace</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Click and drag to rotate • Auto-rotation: {isPlaying ? 'On' : 'Off'}
          </div>
        </div>

        {/* Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-96 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          
          {/* Info overlays */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white">Development Workspace</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Where we craft your digital solutions</p>
            </div>
          </div>

          <div className="absolute top-4 right-4 space-y-2">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white">Always Working</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">24/7 development & support</p>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-center">
              <h4 className="font-semibold text-gray-800 dark:text-white">Our Digital Office</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Serving clients worldwide from our virtual workspace</p>
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="p-6 border-t border-gray-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Always Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Remote Friendly</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">AI</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Powered Tools</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualOffice;
