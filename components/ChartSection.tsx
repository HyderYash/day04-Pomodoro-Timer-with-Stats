'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ChartSectionProps {
  data: { date: string; minutes: number }[];
}

export default function ChartSection({ data }: ChartSectionProps) {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    minutes: item.minutes,
    fullDate: item.date,
  }));

  const maxValue = Math.max(...chartData.map((d) => d.minutes), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden bg-white dark:bg-[#1C1C1E] rounded-[20px] p-6 shadow-lg dark:shadow-2xl border border-border-light dark:border-border-dark hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">
            Last 7 Days
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
        
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barCategoryGap="15%">
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#007AFF" stopOpacity={1} />
                <stop offset="100%" stopColor="#0051D5" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="barGradientDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A84FF" stopOpacity={1} />
                <stop offset="100%" stopColor="#007AFF" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: 'currentColor', fontSize: 12 }}
              className="text-text-light dark:text-text-dark opacity-60"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'currentColor', fontSize: 12 }}
              className="text-text-light dark:text-text-dark opacity-60"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-[#2C2C2E] px-3 py-2 rounded-lg shadow-lg border border-border-light dark:border-border-dark">
                      <p className="text-sm font-semibold text-text-light dark:text-text-dark">
                        {payload[0].payload.fullDate && new Date(payload[0].payload.fullDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-lg font-bold text-blue-500 dark:text-blue-400">
                        {payload[0].value} min
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="minutes"
              radius={[12, 12, 0, 0]}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => {
                const height = (entry.minutes / maxValue) * 100;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={height > 0 ? (isDark ? 'url(#barGradientDark)' : 'url(#barGradient)') : 'transparent'}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

