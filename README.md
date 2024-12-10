# Interactive Garden Animation

A dynamic, interactive web animation featuring a garden that changes throughout the day and night cycle. The animation includes flowers, butterflies, fireflies, and a responsive day/night environment that syncs with Manila time.

Created by Xynn Almeyda

## Features

### Day/Night Cycle
- Automatically syncs with Manila timezone
- Smooth transitions between different times of day:
  - Early Dawn (5:00-7:00)
  - Morning (7:00-12:00)
  - Afternoon (12:00-17:00)
  - Sunset (17:00-18:30)
  - Night (18:30-5:00)

### Interactive Elements
- Click anywhere to grow sunflowers
- Sparkle effects follow mouse movement
- Butterflies during daytime
- Fireflies during nighttime
- Shooting stars at night
- Dynamic cloud formations

### Responsive Design
- Adapts to different screen sizes
- Mobile-friendly flower sizing
- Smooth transitions between states

## Usage

1. Include the script in your HTML file
2. Add the necessary CSS styles
3. Initialize with a basic HTML structure containing a `.sunflwr` element 

## Interactions

- **Click**: Spawns new flowers in random positions
- **Mouse Movement**: Creates sparkle effects with 10% probability
- **Time-based**: Automatically transitions between day and night elements

## Technical Details

- Pure JavaScript implementation
- No external dependencies
- Uses requestAnimationFrame for smooth animations
- Implements dynamic DOM manipulation
- Utilizes CSS transitions and animations

## Browser Support

Works in modern browsers that support:
- CSS Custom Properties
- CSS Transforms
- CSS Transitions
- requestAnimationFrame
- Modern JavaScript (ES6+)

## Author

Created with 💖 by Xynn Almeyda
