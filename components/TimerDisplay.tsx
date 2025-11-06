'use client';

import { motion } from 'framer-motion';
import { TimerMode } from '@/lib/useTimer';

interface TimerDisplayProps {
  time: string;
  progress: number;
  mode: TimerMode;
  isRunning: boolean;
}

const modeLabels: Record<TimerMode, string> = {
  focus: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

const modeConfig: Record<TimerMode, { color: string; darkColor: string; gradient: string }> = {
  focus: {
    color: '#007AFF',
    darkColor: '#0A84FF',
    gradient: 'from-blue-500 via-blue-400 to-blue-600',
  },
  shortBreak: {
    color: '#34C759',
    darkColor: '#30D158',
    gradient: 'from-green-500 via-green-400 to-green-600',
  },
  longBreak: {
    color: '#FF9500',
    darkColor: '#FF9F0A',
    gradient: 'from-orange-500 via-orange-400 to-orange-600',
  },
};

export default function TimerDisplay({ time, progress, mode, isRunning }: TimerDisplayProps) {
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const config = modeConfig[mode];

  return (
    <div className="relative flex items-center justify-center w-full max-w-md mx-auto">
      {/* Outer glow effect - wraps around full circle */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          mode === 'focus'
            ? 'opacity-30 dark:opacity-40'
            : mode === 'shortBreak'
            ? 'opacity-30 dark:opacity-40'
            : 'opacity-30 dark:opacity-40'
        }`}
        style={{
          transform: `scale(${isRunning ? 1.1 : 1})`,
          transition: 'transform 2s ease-in-out',
        }}
      >
        <div
          className={`w-80 h-80 rounded-full blur-3xl ${
            mode === 'focus'
              ? 'bg-blue-500'
              : mode === 'shortBreak'
              ? 'bg-green-500'
              : 'bg-orange-500'
          }`}
        />
      </div>

      <motion.div
        className="relative"
        animate={isRunning ? { scale: [1, 1.015, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="transform -rotate-90 w-64 h-64 relative z-10" viewBox="0 0 260 260">
          <defs>
            {/* Background circle gradient - mode specific */}
            <linearGradient id={`bg-gradient-${mode}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={config.color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={config.color} stopOpacity="0.05" />
            </linearGradient>
            
            {/* Progress circle gradient */}
            <linearGradient id={`progress-gradient-${mode}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={config.color} stopOpacity="1" />
              <stop offset="100%" stopColor={config.darkColor} stopOpacity="0.9" />
            </linearGradient>
            
            {/* Glow filter for the circle ring */}
            <filter id={`glow-${mode}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Inner glow effect */}
            <radialGradient id={`inner-glow-${mode}`} cx="50%" cy="50%">
              <stop offset="0%" stopColor={config.color} stopOpacity={isRunning ? "0.3" : "0.15"} />
              <stop offset="50%" stopColor={config.color} stopOpacity={isRunning ? "0.15" : "0.08"} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Background circle - now mode specific */}
          <circle
            cx="130"
            cy="130"
            r="120"
            fill="none"
            stroke={`url(#bg-gradient-${mode})`}
            strokeWidth="10"
            className="opacity-40"
          />
          
          {/* Progress circle with gradient and glow */}
          <motion.circle
            cx="130"
            cy="130"
            r="120"
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'linear' }}
            style={{
              strokeDasharray: circumference,
              stroke: `url(#progress-gradient-${mode})`,
              filter: `url(#glow-${mode})`,
            }}
            className="drop-shadow-lg"
          />
          
          {/* Inner glow circle (inside the ring) */}
          <circle
            cx="130"
            cy="130"
            r="110"
            fill={`url(#inner-glow-${mode})`}
            className="transition-opacity duration-500"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="mb-3"
          >
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
              mode === 'focus'
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                : mode === 'shortBreak'
                ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                : 'bg-orange-500/20 text-orange-600 dark:text-orange-400'
            }`}>
              {modeLabels[mode]}
            </span>
          </motion.div>
          
          <motion.div
            key={time}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative"
          >
            <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-transparent via-white to-transparent dark:via-white/20" />
            <p
              className="relative text-7xl font-extralight tracking-tighter text-text-light dark:text-text-dark"
              style={{
                fontVariantNumeric: 'tabular-nums',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              {time}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

