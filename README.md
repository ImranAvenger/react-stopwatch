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
│   ├── manifest.json              # PWA manifest
│   ├── service-worker.js          # Service worker for offline support
│   ├── stopwatch-icon-*.svg       # App icons
│   └── vite.svg
├── src/
│   ├── components/                # React components
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # Utility functions
│   ├── App.jsx                    # Main app component
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Entry point
├── index.html                     # HTML template with PWA meta tags
├── vite.config.js                 # Vite configuration
├── eslint.config.js               # ESLint configuration
└── package.json
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

MIT
