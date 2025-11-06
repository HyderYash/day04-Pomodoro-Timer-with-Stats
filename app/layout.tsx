import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pomodoro Timer 🍏 — Day 4 of #100Days100Projects',
  description: 'A beautiful Pomodoro Timer with stats tracking, built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

