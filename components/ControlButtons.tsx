'use client';

import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlButtonsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function ControlButtons({ isRunning, onStart, onPause, onReset }: ControlButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-5 mt-10">
      {/* Main Play/Pause Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={isRunning ? onPause : onStart}
        className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-2xl transition-all duration-300 hover:shadow-blue-500/50"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
        
        {/* Button content */}
        <div className="relative z-10">
          {isRunning ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 fill-current ml-1" />
          )}
        </div>
        
        {/* Ripple effect */}
        {isRunning && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-300"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.button>

      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: -180 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-[#2C2C2E] text-text-light dark:text-text-dark shadow-lg hover:shadow-xl border border-border-light dark:border-border-dark transition-all duration-300 hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E]"
      >
        <RotateCcw className="w-5 h-5 transition-transform group-hover:scale-110" />
      </motion.button>
    </div>
  );
}

