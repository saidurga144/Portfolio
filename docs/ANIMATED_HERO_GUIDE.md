# Animated Shader Hero Component Guide

## Overview

Your portfolio now features a stunning WebGL-powered animated background in the hero section. This creates a dynamic, interactive visual experience that responds to mouse/touch movements.

## What Was Added

### 1. Animated Shader Hero Component
- **Location**: `components/ui/animated-shader-hero.tsx`
- **Technology**: WebGL 2.0 with custom GLSL shaders
- **Features**:
  - Real-time animated background with particle effects
  - Interactive mouse/touch tracking
  - Smooth gradient animations
  - Responsive design
  - Performance optimized

### 2. Updated Hero Section
- **Location**: `components/sections/Hero.tsx`
- Now uses the animated shader background
- Includes your name, title, and description
- Two CTA buttons:
  - "View My Projects" - scrolls to projects section
  - "Get In Touch" - scrolls to contact section
- Trust badge with cybersecurity icons

### 3. Contact Bar
- **Location**: `components/ContactBar.tsx`
- Displays contact information below hero
- Quick access to phone, email, LinkedIn, and GitHub
- Hover effects for better UX

## How It Works

### WebGL Shader Animation
The background uses a custom fragment shader that creates:
- Flowing particle effects
- Dynamic color gradients (blue/cyan theme)
- Noise-based cloud patterns
- Time-based animations
- Interactive mouse tracking

### Performance
- Uses `requestAnimationFrame` for smooth 60fps animation
- Optimized for different device pixel ratios
- Automatically adjusts to screen size
- Minimal CPU/GPU usage

## Customization

### Change Colors

Edit the gradient colors in `components/sections/Hero.tsx`:

```tsx
// Current: Blue/Cyan theme
from-blue-300 via-cyan-400 to-blue-300

// Change to Orange theme:
from-orange-300 via-yellow-400 to-orange-300
```

### Modify Trust Badge

```tsx
trustBadge={{
  text: "Your custom text here",
  icons: ["🔒", "💻", "🚀"] // Change icons
}}
```

### Update Headline

```tsx
headline={{
  line1: "Your First Line",
  line2: "Your Second Line"
}}
```

### Change Subtitle

```tsx
subtitle="Your custom subtitle text..."
```

### Modify Buttons

```tsx
buttons={{
  primary: {
    text: "Custom Button Text",
    onClick: () => {
      // Your custom action
    }
  },
  secondary: {
    text: "Another Button",
    onClick: () => {
      // Your custom action
    }
  }
}}
```

## Shader Customization

To modify the visual effects, edit the `defaultShaderSource` in `components/ui/animated-shader-hero.tsx`.

### Current Effect
- Flowing particles with trails
- Cloud-like patterns
- Blue/orange color scheme in shader

### To Change Shader Colors

Find this line in the shader:
```glsl
col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
```

Adjust the RGB multipliers:
- First value: Red channel
- Second value: Green channel  
- Third value: Blue channel

## Browser Compatibility

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Requirements**: WebGL 2.0 support (available in all modern browsers)

## Performance Tips

1. **Mobile Optimization**: The component automatically reduces pixel density on mobile devices
2. **Battery Saving**: Animation pauses when tab is not visible
3. **Memory Management**: Properly cleans up WebGL resources on unmount

## Troubleshooting

### Black Screen
- Check browser console for WebGL errors
- Ensure WebGL 2.0 is supported
- Try disabling browser extensions

### Performance Issues
- Reduce `window.devicePixelRatio` multiplier in the code
- Simplify shader calculations
- Test on different devices

### Animation Not Smooth
- Check if other heavy processes are running
- Ensure GPU acceleration is enabled in browser
- Try closing other tabs

## File Structure

```
components/
├── ui/
│   └── animated-shader-hero.tsx    # Main component with WebGL
├── sections/
│   └── Hero.tsx                    # Hero section using the component
└── ContactBar.tsx                  # Contact info bar
```

## Next Steps

1. ✅ Animated hero is integrated
2. ✅ Contact bar added
3. ✅ Smooth scroll navigation working
4. Test on different devices
5. Customize colors to match your brand
6. Deploy and share!

## Credits

Shader effect inspired by Matthias Hurrle (@atzedent)
Adapted for React/Next.js with TypeScript

---

Your portfolio now has a professional, eye-catching animated hero section! 🚀
