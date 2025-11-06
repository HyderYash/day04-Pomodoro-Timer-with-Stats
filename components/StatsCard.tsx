'use client';

import { motion } from 'framer-motion';
import { Clock, Target, Flame } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: 'clock' | 'target' | 'flame';
}

const iconMap = {
  clock: Clock,
  target: Target,
  flame: Flame,
};

const iconConfig = {
  clock: {
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
  },
  target: {
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900',
  },
  flame: {
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900',
  },
};

export default function StatsCard({ label, value, icon }: StatsCardProps) {
  const Icon = iconMap[icon];
  const config = iconConfig[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden bg-white dark:bg-[#1C1C1E] rounded-[20px] p-6 shadow-lg dark:shadow-2xl border border-border-light dark:border-border-dark hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300"
    >
      {/* Gradient background overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-text-light dark:text-text-dark opacity-70 group-hover:opacity-100 transition-opacity">
            {label}
          </p>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`p-2.5 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg`}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
        </div>
        <motion.p
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-4xl font-extralight tracking-tight text-text-light dark:text-text-dark group-hover:scale-105 transition-transform duration-300"
        >
          {value}
        </motion.p>
      </div>
    </motion.div>
  );
}

