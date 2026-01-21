import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion'
import { Terminal } from './Terminal'

const COMMAND = 'npx skills add getsentry/sentry-agent-skills'

const SKILLS_BANNER = [
  '███████╗██╗  ██╗██╗██╗     ██╗     ███████╗',
  '██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝',
  '███████╗█████╔╝ ██║██║     ██║     ███████╗',
  '╚════██║██╔═██╗ ██║██║     ██║     ╚════██║',
  '███████║██║  ██╗██║███████╗███████╗███████║',
  '╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝',
]

const OUTPUT_LINES = [
  { text: '', type: 'spacer' },
  { text: '┌   skills', type: 'header' },
  { text: '│', type: 'line' },
  { text: '◇  Source: https://github.com/getsentry/sentry-agent-skills.git', type: 'info' },
  { text: '│', type: 'line' },
  { text: '◇  Repository cloned', type: 'success' },
  { text: '│', type: 'line' },
  { text: '◇  Found 10 skills', type: 'success' },
  { text: '│', type: 'line' },
  { text: '◆  Select skills to install', type: 'prompt' },
]

const SKILLS_LIST = [
  'sentry-fix-issues',
  'sentry-pr-code-review',
  'sentry-setup-ai-monitoring',
  'sentry-setup-logging',
  'sentry-setup-metrics',
  'sentry-setup-tracing',
]

export const TerminalAnimation: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Phase 1: Typing animation (frames 0-120)
  const typingProgress = interpolate(frame, [30, 120], [0, COMMAND.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const typedCommand = COMMAND.slice(0, Math.floor(typingProgress))

  // Cursor blink
  const cursorVisible = Math.floor(frame / 15) % 2 === 0 || frame < 120

  // Phase 2: Command execution (frame 140+)
  const executeFrame = 140

  // Phase 2a: Show ASCII banner (frames 140-170)
  const bannerStartFrame = executeFrame
  const bannerLineDelay = 3
  const visibleBannerLines = Math.min(
    SKILLS_BANNER.length,
    Math.max(0, Math.floor((frame - bannerStartFrame) / bannerLineDelay))
  )

  // Phase 2b: Show output lines (frames 180+)
  const outputStartFrame = 180
  const outputLineDelay = 10
  const visibleOutputLines = Math.max(
    0,
    Math.floor((frame - outputStartFrame) / outputLineDelay)
  )

  // Phase 2c: Show skills list (frames 300+)
  const skillsStartFrame = 300
  const skillLineDelay = 12
  const visibleSkills = Math.max(
    0,
    Math.floor((frame - skillsStartFrame) / skillLineDelay)
  )

  // 3D Panning transform - smooth continuous pan from tilted-left to tilted-right
  const rotateX = interpolate(frame, [0, 450], [12, -8], {
    extrapolateRight: 'clamp',
  })
  const rotateY = interpolate(frame, [0, 450], [-15, 15], {
    extrapolateRight: 'clamp',
  })

  // Subtle horizontal drift
  const translateX = interpolate(frame, [0, 450], [-30, 30], {
    extrapolateRight: 'clamp',
  })

  const getLineColor = (type: string) => {
    switch (type) {
      case 'header':
        return '#9E86FF'
      case 'line':
        return '#444'
      case 'info':
        return '#7553FF'
      case 'success':
        return '#28ca42'
      case 'prompt':
        return '#A737B4'
      default:
        return '#E8E1FF'
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0d0518 0%, #1a0a2e 50%, #0d0518 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1200,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '85%',
          height: '75%',
          transform: `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateX(${translateX}px)
          `,
          transformStyle: 'preserve-3d',
        }}
      >
        <Terminal>
          {/* Prompt line */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#A737B4', fontWeight: 600 }}>➜</span>
            <span style={{ color: '#7553FF', marginLeft: 12, fontWeight: 600 }}>~</span>
            <span style={{ color: '#E8E1FF', marginLeft: 16 }}>{typedCommand}</span>
            {frame < 140 && (
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 24,
                  background: cursorVisible ? '#7553FF' : 'transparent',
                  marginLeft: 2,
                  verticalAlign: 'middle',
                  boxShadow: cursorVisible ? '0 0 10px rgba(117, 83, 255, 0.8)' : 'none',
                }}
              />
            )}
          </div>

          {/* ASCII Banner */}
          {frame >= bannerStartFrame && (
            <div style={{ marginTop: 20 }}>
              {SKILLS_BANNER.slice(0, visibleBannerLines).map((line, index) => (
                <div
                  key={`banner-${index}`}
                  style={{
                    color: '#7553FF',
                    fontSize: '0.5em',
                    lineHeight: 1.1,
                    fontWeight: 700,
                    opacity: interpolate(
                      frame - bannerStartFrame - index * bannerLineDelay,
                      [0, 5],
                      [0, 1],
                      { extrapolateRight: 'clamp' }
                    ),
                    textShadow: '0 0 20px rgba(117, 83, 255, 0.6)',
                    whiteSpace: 'pre',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Output lines */}
          {frame >= outputStartFrame && (
            <div style={{ marginTop: 16 }}>
              {OUTPUT_LINES.slice(0, visibleOutputLines).map((line, index) => (
                <div
                  key={`output-${index}`}
                  style={{
                    color: getLineColor(line.type),
                    marginTop: line.type === 'spacer' ? 8 : 2,
                    fontSize: '0.75em',
                    opacity: interpolate(
                      frame - outputStartFrame - index * outputLineDelay,
                      [0, 8],
                      [0, 1],
                      { extrapolateRight: 'clamp' }
                    ),
                    transform: `translateX(${interpolate(
                      frame - outputStartFrame - index * outputLineDelay,
                      [0, 8],
                      [20, 0],
                      { extrapolateRight: 'clamp' }
                    )}px)`,
                  }}
                >
                  {line.text || '\u00A0'}
                </div>
              ))}
            </div>
          )}

          {/* Skills list */}
          {frame >= skillsStartFrame && (
            <div style={{ marginTop: 4, marginLeft: 24 }}>
              {SKILLS_LIST.slice(0, visibleSkills).map((skill, index) => (
                <div
                  key={`skill-${index}`}
                  style={{
                    color: '#E8E1FF',
                    fontSize: '0.7em',
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    opacity: interpolate(
                      frame - skillsStartFrame - index * skillLineDelay,
                      [0, 8],
                      [0, 1],
                      { extrapolateRight: 'clamp' }
                    ),
                    transform: `translateX(${interpolate(
                      frame - skillsStartFrame - index * skillLineDelay,
                      [0, 8],
                      [30, 0],
                      { extrapolateRight: 'clamp' }
                    )}px)`,
                  }}
                >
                  <span style={{
                    color: '#28ca42',
                    fontSize: '1.2em',
                  }}>
                    ◉
                  </span>
                  <span style={{ color: '#9E86FF' }}>{skill}</span>
                </div>
              ))}
            </div>
          )}
        </Terminal>
      </div>
    </div>
  )
}
