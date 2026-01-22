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

  // Phase 0: macOS-style app opening animation (frames 0-45)
  const openingDuration = 45
  const openingProgress = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
      mass: 0.8,
    },
  })

  // Scale animation: start small in the middle, expand outward
  const scaleY = interpolate(openingProgress, [0, 1], [0.05, 1], {
    extrapolateRight: 'clamp',
  })
  const scaleX = interpolate(openingProgress, [0, 1], [0.3, 1], {
    extrapolateRight: 'clamp',
  })

  // Translate up from middle (starts at center, moves up slightly as it expands)
  const translateYOpen = interpolate(openingProgress, [0, 1], [100, 0], {
    extrapolateRight: 'clamp',
  })

  // Opacity fade in during opening
  const openingOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  })

  // Phase 1: Typing animation (starts very quickly after opening begins)
  const typingStartFrame = 20
  const typingProgress = interpolate(frame, [typingStartFrame, typingStartFrame + 60], [0, COMMAND.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const typedCommand = COMMAND.slice(0, Math.floor(typingProgress))

  // Cursor blink
  const cursorVisible = Math.floor(frame / 15) % 2 === 0 || frame < typingStartFrame + 70

  // Phase 2: Command execution
  const executeFrame = typingStartFrame + 70

  // Phase 2a: Show ASCII banner (instantly, all at once)
  const bannerStartFrame = executeFrame
  const showBanner = frame >= bannerStartFrame

  // Phase 2b: Show output lines
  const outputStartFrame = executeFrame + 20
  const outputLineDelay = 5
  const visibleOutputLines = Math.max(
    0,
    Math.floor((frame - outputStartFrame) / outputLineDelay)
  )

  // Phase 2c: Show skills list
  const skillsStartFrame = outputStartFrame + 50
  const skillLineDelay = 6
  const visibleSkills = Math.max(
    0,
    Math.floor((frame - skillsStartFrame) / skillLineDelay)
  )


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
        background: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '92%',
          height: '82%',
          opacity: openingOpacity,
          transform: `
            translateY(${translateYOpen}px)
            scaleX(${scaleX})
            scaleY(${scaleY})
          `,
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <Terminal>
            {/* Prompt line */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#A737B4', fontWeight: 600 }}>➜</span>
            <span style={{ color: '#7553FF', marginLeft: 12, fontWeight: 600 }}>~</span>
            <span style={{ color: '#E8E1FF', marginLeft: 16 }}>{typedCommand}</span>
            {frame < executeFrame && (
              <span
                style={{
                  display: 'inline-block',
                  width: 20,
                  height: 36,
                  background: cursorVisible ? '#7553FF' : 'transparent',
                  marginLeft: 2,
                  verticalAlign: 'middle',
                  boxShadow: cursorVisible ? '0 0 10px rgba(117, 83, 255, 0.8)' : 'none',
                }}
              />
            )}
          </div>

          {/* ASCII Banner - appears instantly */}
          {showBanner && (
            <div style={{ marginTop: 20, marginBottom: 4 }}>
              {SKILLS_BANNER.map((line, index) => (
                <div
                  key={`banner-${index}`}
                  style={{
                    color: '#7553FF',
                    fontSize: '0.5em',
                    lineHeight: 1.1,
                    fontWeight: 700,
                    opacity: interpolate(
                      frame - bannerStartFrame,
                      [0, 8],
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
            <div style={{ marginTop: 2 }}>
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
    </div>
  )
}
