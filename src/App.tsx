import { Player } from '@remotion/player'
import { TerminalAnimation } from './remotion/TerminalAnimation'

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a0533 0%, #2d1b4e 25%, #4a1942 50%, #2d1b4e 75%, #1a0533 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #7553FF 0%, #A737B4 50%, #7553FF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Sentry Agent Skills
        </h1>
        <p
          style={{
            fontSize: 18,
            color: '#9E86FF',
            marginTop: 16,
            maxWidth: 500,
            lineHeight: 1.6,
          }}
        >
          Watch the command being typed and executed in a cinematic 3D terminal animation
        </p>
      </div>

      {/* Video Player */}
      <div
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 30px 100px rgba(117, 83, 255, 0.3), 0 10px 40px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(117, 83, 255, 0.2)',
        }}
      >
        <Player
          component={TerminalAnimation}
          durationInFrames={450}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          style={{
            width: 'min(960px, 90vw)',
            aspectRatio: '16/9',
          }}
          loop
          autoPlay
        />
      </div>

      {/* Command Preview */}
      <div
        style={{
          marginTop: 48,
          padding: '20px 32px',
          background: 'rgba(117, 83, 255, 0.1)',
          borderRadius: 12,
          border: '1px solid rgba(117, 83, 255, 0.2)',
        }}
      >
        <code
          style={{
            fontFamily: 'SF Mono, Monaco, Consolas, monospace',
            fontSize: 16,
            color: '#E8E1FF',
          }}
        >
          <span style={{ color: '#7553FF' }}>$</span>{' '}
          npx skills add getsentry/sentry-agent-skills
        </code>
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: 48,
          fontSize: 14,
          color: 'rgba(158, 134, 255, 0.6)',
        }}
      >
        Powered by{' '}
        <a
          href="https://remotion.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#7553FF', textDecoration: 'none' }}
        >
          Remotion
        </a>
        {' '}+{' '}
        <a
          href="https://sentry.io"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#A737B4', textDecoration: 'none' }}
        >
          Sentry
        </a>
      </p>
    </div>
  )
}

export default App
