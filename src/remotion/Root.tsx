import { Composition } from 'remotion'
import { TerminalAnimation } from './TerminalAnimation'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TerminalAnimation"
        component={TerminalAnimation}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  )
}
