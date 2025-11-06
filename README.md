# ⏱️ Pomodoro Timer 🍏 — Day 4 of #100Days100Projects

A beautiful, Apple-inspired Pomodoro Timer application with comprehensive stats tracking. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. This elegant productivity tool helps you stay focused with customizable timer sessions, detailed statistics, and a premium user experience.

![Pomodoro Timer](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎯 Core Functionality
- **Pomodoro Timer**
  - 25-minute focus sessions (fully customizable)
  - 5-minute short breaks (customizable)
  - 15-minute long breaks (customizable)
  - Smooth circular progress indicator with animated countdown
  - Start, pause, and reset controls
  - Mode switching (Focus, Short Break, Long Break)
  - Optional sound notifications when timer completes

### 📊 Statistics Dashboard
- **Comprehensive Tracking**
  - Total focus time accumulated (in minutes)
  - Total sessions completed counter
  - Longest streak tracking (consecutive days)
  - Current streak display
  - Daily activity visualization

- **7-Day Activity Chart**
  - Beautiful bar chart showing focus minutes per day
  - Interactive tooltips with detailed information
  - Gradient-filled bars with smooth animations
  - Responsive design for all screen sizes

### ⚙️ Settings & Customization
- **Timer Configuration**
  - Adjustable focus duration (1-60 minutes)
  - Customizable short break duration (1-30 minutes)
  - Customizable long break duration (1-60 minutes)
  - Auto-switch between focus and breaks
  - Sound notification toggle

- **Data Management**
  - Reset all statistics with confirmation
  - All preferences saved automatically
  - Persistent data using LocalStorage

### 🎨 Design & UX
- **Apple-Inspired Design**
  - Premium, minimalist interface
  - Smooth animations and transitions
  - Glassmorphism effects
  - Gradient backgrounds and glows
  - Professional color palette

- **Theme Support**
  - Light and dark mode
  - System theme detection
  - Smooth theme transitions
  - Persistent theme preference

- **Responsive Design**
  - Mobile-first approach
  - Optimized for all screen sizes
  - Touch-friendly controls
  - Adaptive layouts

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library

### Additional Libraries
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **LocalStorage API** - Client-side data persistence

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pomodoro-timer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use yarn
yarn build
yarn start
```

## 📁 Project Structure

```
pomodoro-timer/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and animations
├── components/
│   ├── TimerDisplay.tsx    # Animated circular timer display
│   ├── ControlButtons.tsx  # Start/Pause/Reset buttons
│   ├── StatsCard.tsx       # Statistics display cards
│   ├── ChartSection.tsx    # 7-day activity chart
│   ├── SettingsModal.tsx    # Settings configuration modal
│   └── ThemeToggle.tsx    # Dark/light mode switcher
├── lib/
│   ├── useLocalStorage.ts  # Custom hook for LocalStorage
│   ├── useTimer.ts         # Timer logic and state management
│   └── timeUtils.ts        # Time formatting utilities
├── public/
│   └── sounds/
│       └── notification.mp3 # Timer completion sound (optional)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎨 Design System

### Color Palette

#### Light Theme
- **Background**: `#F5F5F7` - Soft, neutral background
- **Text**: `#1C1C1E` - High contrast text
- **Accent**: `#007AFF` - Apple blue
- **Secondary**: `#E5E2DC` - Subtle secondary elements
- **Border**: `#D1D1D1` - Light borders

#### Dark Theme
- **Background**: `#000000` - Pure black background
- **Text**: `#F5F5F7` - Light text for contrast
- **Accent**: `#0A84FF` - Brighter blue for dark mode
- **Secondary**: `#191B28` - Dark secondary elements
- **Border**: `#4A4A4A` - Subtle dark borders

### Typography
- **Font Family**: SF Pro Display (system fallback: Inter)
- **Font Weights**: Light (300), Regular (400), Medium (500), Semibold (600)
- **Font Sizes**: Responsive scaling from mobile to desktop

### Components
- **Border Radius**: 12px (standard), 20px (large cards)
- **Shadows**: Layered shadow system for depth
- **Animations**: Spring-based animations for natural feel
- **Transitions**: 300ms standard transition duration

## 📦 Data Persistence

All data is stored locally in the browser's LocalStorage:

- **Timer Settings**
  - Focus duration
  - Short break duration
  - Long break duration
  - Auto-switch preference
  - Sound notification preference

- **Statistics**
  - Total focus minutes
  - Total sessions completed
  - Longest streak
  - Current streak
  - Daily activity data (last 7 days)

**Note**: Data is stored per browser and device. Clearing browser data will reset all statistics.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Click "Deploy" and your app will be live!

### Other Deployment Options

This Next.js app can be deployed to any platform that supports Next.js:

- **[Netlify](https://www.netlify.com/)** - One-click deployment
- **[AWS Amplify](https://aws.amazon.com/amplify/)** - AWS hosting
- **[Railway](https://railway.app/)** - Simple deployment platform
- **[Render](https://render.com/)** - Cloud platform for apps

### Environment Variables

No environment variables are required for this project. All data is stored client-side.

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Code Style

- **ESLint**: Configured with Next.js recommended rules
- **TypeScript**: Strict mode enabled
- **Prettier**: Recommended for code formatting

## 🎯 Usage Guide

### Starting a Timer Session

1. Select your desired mode (Focus, Short Break, or Long Break)
2. Click the play button to start the timer
3. The circular progress indicator will show remaining time
4. Click pause to temporarily stop the timer
5. Click reset to restart the current session

### Customizing Timer Durations

1. Click the settings icon (gear) in the top right
2. Adjust the duration sliders for each timer type
3. Click "Save Changes" to apply your preferences

### Viewing Statistics

- View your total focus time, sessions completed, and longest streak in the stats cards
- Check your 7-day activity chart to see daily progress
- Hover over chart bars to see detailed information

### Resetting Data

1. Open the settings modal
2. Scroll to the "Reset Data" section
3. Click "Reset All Stats"
4. Confirm the action in the dialog

## 🔧 Troubleshooting

### Timer Not Working
- Ensure JavaScript is enabled in your browser
- Check browser console for any errors
- Try refreshing the page

### Statistics Not Saving
- Check if LocalStorage is enabled in your browser
- Ensure you're not in private/incognito mode
- Clear browser cache and try again

### Sound Not Playing
- Ensure you have a `notification.mp3` file in `/public/sounds/`
- Check browser audio permissions
- Verify sound notifications are enabled in settings

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of the #100Days100Projects challenge and is open source.

## 👤 Author

**Yash Sharma**

- Built with ❤️ using Next.js and TypeScript
- Part of the #100Days100Projects challenge
- Inspired by Apple's design language

## 🙏 Acknowledgments

- Apple for design inspiration
- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Recharts for beautiful data visualization
- The open-source community

## 📈 Future Enhancements

- [ ] Task management integration
- [ ] Export stats to CSV/JSON
- [ ] Multiple timer presets
- [ ] Desktop notifications (PWA)
- [ ] Pomodoro technique tips and guides
- [ ] Social sharing of achievements
- [ ] Custom sound selection
- [ ] Widget support for mobile devices

---

**Made with 🍏 for productivity enthusiasts**

**#100Days100Projects** 🚀

