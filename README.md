# React Stopwatch - Progressive Web App

A feature-rich stopwatch application built with React + Vite that works as a Progressive Web App (PWA). The app can be installed on any device and works offline with full functionality.

## Features

- ⏱️ **Precise Stopwatch**: Accurate time tracking with millisecond precision
- 🔄 **Lap Recording**: Record and view lap times with automatic statistics
- 🎨 **Dark/Light Theme**: Toggle between dark and light modes
- 🔊 **Sound Effects**: Audio feedback for actions (can be toggled)
- ⌨️ **Keyboard Shortcuts**:
  - Space: Start/Pause
  - L: Record Lap
  - R: Reset (when stopped)
  - Ctrl+S: Toggle Sound
  - Shift+T: Toggle Theme
  - Shift+?: Show shortcuts guide
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- 💾 **Data Persistence**: Saves stopwatch state to localStorage
- 📦 **Progressive Web App**: Installable on any device and works offline

## PWA Features

This application is fully configured as a Progressive Web App:

- **Service Worker**: Enables offline functionality and caching
- **Web App Manifest**: Allows installation on home screen
- **Standalone Mode**: Runs without browser UI (when installed)
- **App Icons**: Custom icons for various device types
- **Maskable Icons**: Adaptive icons for modern Android devices

### Install the App

**On Chrome/Edge (Desktop/Mobile):**

1. Click the install icon in the address bar (when available)
2. Or click the menu → "Install app"

**On iOS:**

1. Tap Share button
2. Select "Add to Home Screen"

**On Android:**

1. Open the app in Chrome
2. Tap the menu → "Install app" or look for the install prompt

## Getting Started

### Prerequisites

- Node.js 16.x or higher

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
react-stopwatch/
├── public/
│   ├── manifest.json              # PWA manifest configuration
│   ├── service-worker.js          # Service worker for offline support
│   └── assets/
├── src/
│   ├── components/
│   │   ├── LapsPanel.jsx          # Main laps panel component
│   │   ├── TimerSection.jsx       # Timer section component
│   │   ├── LapsSection/           # Laps management
│   │   │   ├── index.jsx
│   │   │   ├── LapsHeader.jsx
│   │   │   ├── LapsList.jsx
│   │   │   ├── LapItem.jsx
│   │   │   ├── LapStatistics.jsx
│   │   │   ├── EmptyLapsState.jsx
│   │   │   └── constants.js
│   │   ├── Timer/                 # Timer display & controls
│   │   │   ├── TimerDisplay.jsx
│   │   │   ├── DigitDisplay.jsx
│   │   │   └── ControlPanel.jsx
│   │   └── UI/                    # UI components
│   │       ├── ThemeToggle.jsx    # Dark/Light theme switcher
│   │       ├── SoundToggle.jsx    # Audio effects toggle
│   │       ├── ShortcutsButton.jsx
│   │       ├── KeyboardShortcutsGuide.jsx
│   │       ├── CopyButton.jsx
│   │       └── constants.js
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAppState.js         # Global app state
│   │   ├── useAppInitialization.js # Initialization logic
│   │   ├── useAppEffects.js       # Side effects management
│   │   ├── useAppHandlers.js      # Event handlers
│   │   ├── useTimer.js            # Timer logic
│   │   ├── useTimerHandlers.js    # Timer control handlers
│   │   ├── useLaps.js             # Lap management
│   │   ├── useKeyboardShortcuts.js # Keyboard event handling
│   │   ├── useTheme.js            # Theme management
│   │   ├── useSoundToggle.js      # Sound toggle state
│   │   ├── useSoundEffects.js     # Sound effects management
│   │   ├── useAudio.js            # Audio utilities
│   │   ├── useRunningSound.js     # Running timer sound
│   │   └── useStorageSync.js      # localStorage persistence
│   ├── utils/                     # Utility functions
│   │   ├── audioManager.js        # Audio processing
│   │   ├── formatTime.js          # Time formatting
│   │   └── styleHelpers.js        # Style utilities
│   ├── App.jsx                    # Main app component
│   ├── index.css                  # Global styles
│   ├── main.jsx                   # React entry point
│   └── assets/
├── index.html                     # HTML template with PWA meta tags
├── vite.config.js                 # Vite build configuration
├── eslint.config.js               # ESLint rules
├── package.json                   # Dependencies and scripts
└── README.md
```

## Development

The app uses:

- **React 19** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Browser Support

The app works on:

- Chrome 64+
- Edge 79+
- Firefox 55+
- Safari 12+
- Opera 51+

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
