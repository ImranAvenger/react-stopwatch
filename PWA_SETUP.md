# PWA Configuration Guide

This document explains the Progressive Web App setup for the React Stopwatch application.

## What is a Progressive Web App (PWA)?

A Progressive Web App is a web application that uses modern web capabilities to deliver a user experience similar to native mobile apps. PWAs can:

- Be installed on home screen
- Work offline
- Send push notifications
- Access device features like camera and geolocation
- Provide app-like experience with splash screens and icons

## PWA Components in This Project

### 1. Web App Manifest (`public/manifest.json`)

The manifest file defines how your app appears when installed:

```json
{
  "name": "React Stopwatch",           // Full app name
  "short_name": "Stopwatch",           // Short name for home screen
  "description": "...",                // App description
  "start_url": "/",                    // Starting page
  "display": "standalone",             // Hide browser UI
  "theme_color": "#0f172a",            // Theme color
  "background_color": "#ffffff",       // Splash screen color
  "icons": [...]                       // App icons for different sizes
}
```

### 2. Service Worker (`public/service-worker.js`)

The service worker enables offline functionality:

- **Installation**: Caches essential assets
- **Activation**: Cleans up old caches
- **Fetch Interception**: Serves cached content when offline
- **Network-First Strategy**: Tries network first, falls back to cache

### 3. HTML Meta Tags (`index.html`)

PWA-specific meta tags for better app experience:

```html
<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json" />

<!-- iOS Support -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent"
/>
<meta name="apple-mobile-web-app-title" content="Stopwatch" />
<link rel="apple-touch-icon" href="/stopwatch-icon-192.svg" />

<!-- Android Support -->
<meta name="theme-color" content="#0f172a" />
<meta name="mobile-web-app-capable" content="yes" />
```

### 4. Service Worker Registration (`src/main.jsx`)

```javascript
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
```

Registers the service worker when the page loads.

## Installation Methods

### Desktop (Chrome/Edge)

1. Open the app in Chrome or Edge
2. Click the install icon (⬇️ icon in address bar) when it appears
3. Click "Install"

### Mobile (Android)

1. Open in Chrome
2. Tap menu (⋮) → "Install app"
3. Tap "Install"

### iOS (Safari)

1. Open in Safari
2. Tap Share (⬆️ arrow)
3. Scroll and tap "Add to Home Screen"
4. Enter app name and tap "Add"

## Features Provided by PWA Setup

### Offline Support

- All static assets are cached on first load
- App continues to work without internet connection
- State is saved to localStorage

### Home Screen Installation

- App runs in standalone mode (no browser UI)
- Custom app icon on home screen
- Custom splash screen
- Theme color matching

### App-Like Experience

- Runs fullscreen (on installed apps)
- Custom title bar
- Fast load times from cache
- Smooth transitions

## Testing PWA Features

### Check Service Worker Registration

Open browser DevTools (F12):

1. Go to **Application** tab
2. Click **Service Workers** in left panel
3. You should see "react-stopwatch" worker listed as active

### Check Manifest

In DevTools:

1. Go to **Application** tab
2. Click **Manifest** in left panel
3. You should see all app details and icons

### Test Offline Mode

1. Open DevTools (F12)
2. Go to **Network** tab
3. Check **Offline** checkbox
4. The app should still work!

### Check Cache Storage

In DevTools:

1. Go to **Application** tab
2. Go to **Storage** → **Cache Storage**
3. You should see "react-stopwatch-v1" cache
4. Expand to see all cached files

## Cache Strategy Explanation

The service worker uses a **Cache-First with Network Fallback** strategy:

1. **User loads app** → Service worker caches all files
2. **User goes offline** → App loads from cache
3. **User comes back online** → App checks for updates
4. **App updates available** → New files are cached on next load

## Updating Cache

To force a new cache version:

1. Edit `service-worker.js`
2. Change `CACHE_NAME` to a new version:
   ```javascript
   const CACHE_NAME = "react-stopwatch-v2"; // was v1
   ```
3. Deploy the changes

Old caches are automatically deleted when the new service worker activates.

## Browser Compatibility

| Browser | Desktop | Mobile | InstallSupport |
| ------- | ------- | ------ | -------------- |
| Chrome  | ✅      | ✅     | ✅             |
| Edge    | ✅      | ✅     | ✅             |
| Firefox | ✅      | ✅     | ❌ (Partial)   |
| Safari  | ⚠️      | ✅     | ✅ (iOS only)  |
| Opera   | ✅      | ✅     | ✅             |

✅ = Full support
⚠️ = Partial support
❌ = Limited support

## Deployment Considerations

### HTTPS Requirement

Service workers require HTTPS in production. Make sure your hosting:

- Uses SSL/TLS certificate
- Redirects HTTP to HTTPS

### Dev Server

For development, `localhost` and `127.0.0.1` don't require HTTPS.

### Lighthouse PWA Audit

Run Lighthouse audit (DevTools → Lighthouse):

- Should show "Installable" ✅
- Should show all PWA criteria met
- Score: 90+ for PWA

## Security Best Practices

1. **Validate Manifest**: Ensure manifest.json is valid JSON
2. **Update SW Carefully**: Service workers cache content - be careful with updates
3. **Use HTTPS**: Always use HTTPS for production PWAs
4. **Limit Cache Size**: Don't cache too many large files
5. **Version Caches**: Always version cache names when updating

## Troubleshooting

### App Won't Install

- Check browser console for errors (F12)
- Ensure manifest.json is valid
- Clear browser cache
- Try in an incognito window

### Service Worker Not Registering

- Check DevTools → Application → Service Workers
- Look for errors in console
- Ensure service-worker.js is in public folder
- Verify path in main.jsx is correct

### App Not Working Offline

- Check Cache Storage in DevTools
- Ensure Service Worker is active
- Check Network tab to see what's cached
- Verify service-worker.js fetch handlers

### Icons Not Showing

- Check manifest.json icon paths
- Ensure icon files exist in public folder
- Clear browser cache
- Rebuild the app

## Further Reading

- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev - PWA Checklist](https://web.dev/pwa-checklist/)
- [Google - Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers)
- [Web App Manifest Spec](https://w3c.github.io/manifest/)
