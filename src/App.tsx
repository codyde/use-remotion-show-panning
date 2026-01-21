import { Player } from '@remotion/player'
import { useState } from 'react'
import { TerminalAnimation } from './remotion/TerminalAnimation'

function App() {
  const [copied, setCopied] = useState(false)
  const command = 'npx skills add getsentry/sentry-agent-skills'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(315deg, #2a0f2a 0%, #1a0a2e 30%, #0d0118 70%, #050008 100%)',
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
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #7553FF 0%, #A737B4 50%, #7553FF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}
        >
          Agent Skills... Sentry edition
        </h1>

        {/* Command Preview - now under h1 with click to copy */}
        <button
          onClick={handleCopy}
          style={{
            padding: '16px 28px',
            background: 'rgba(117, 83, 255, 0.1)',
            borderRadius: 12,
            border: '1px solid rgba(117, 83, 255, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(117, 83, 255, 0.2)'
            e.currentTarget.style.borderColor = 'rgba(117, 83, 255, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(117, 83, 255, 0.1)'
            e.currentTarget.style.borderColor = 'rgba(117, 83, 255, 0.2)'
          }}
        >
          <code
            style={{
              fontFamily: 'SF Mono, Monaco, Consolas, monospace',
              fontSize: 16,
              color: '#E8E1FF',
            }}
          >
            <span style={{ color: '#7553FF' }}>$</span> {command}
          </code>
          <span
            style={{
              fontSize: 12,
              color: copied ? '#4ECDC4' : '#7553FF',
              fontWeight: 500,
              minWidth: 50,
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>

      {/* Video Player */}
      <div
        style={{
          position: 'relative',
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
            mask: 'radial-gradient(ellipse 85% 85% at center, black 60%, transparent 100%)',
            WebkitMask: 'radial-gradient(ellipse 85% 85% at center, black 60%, transparent 100%)',
          }}
          loop
          autoPlay
        />
      </div>

    </div>
  )
}

export default App
