# Remotion Terminal Animation

A 3D panning terminal animation built with Remotion, React, and TypeScript. Features a dark purple Sentry-themed terminal showing the `npx skills add getsentry/sentry-agent-skills` command being typed and executed with animated output.

## Features

- 3D perspective animation with smooth panning and rotation
- Realistic terminal typing effect with blinking cursor
- ASCII art "SKILLS" banner animation
- Dark purple Sentry-branded color scheme
- Monospace font styling for authentic terminal look
- Built with Remotion for programmatic video rendering

## Tech Stack

- **Remotion** - Programmatic video creation
- **React 19** - UI components
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **Tailwind CSS v4** - Utility styling

## Getting Started

```bash
# Install dependencies
npm install

# Start Remotion Studio
npm run dev

# Render video
npx remotion render src/index.tsx TerminalAnimation out/terminal.mp4
```

## Project Structure

```
├── src/
│   ├── remotion/
│   │   ├── Terminal.tsx      # Terminal component with 3D animation
│   │   ├── Composition.tsx   # Remotion composition setup
│   │   └── Root.tsx          # Remotion root configuration
│   ├── App.tsx               # Preview app component
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles
├── public/                   # Public assets
└── package.json              # Dependencies and scripts
```

## Animation Details

The animation features:
1. Terminal window appearing with 3D perspective
2. Command being typed character by character
3. Enter key simulation with execution
4. ASCII "SKILLS" banner reveal
5. Installation output with skill selection interface
6. Smooth 3D rotation from -20° to 20° across the composition

## License

MIT
