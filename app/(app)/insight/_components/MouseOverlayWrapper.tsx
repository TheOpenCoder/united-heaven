import { useMousePosition } from '@/hooks/mousePositionHook'
import OverlayCard from '@/components/OverlayCard'

const MouseOverlayWrapper = ({ children }: { children: React.ReactNode }) => {
  const position = useMousePosition()

  return (
    <OverlayCard
      position={{ left: position.x + 'px', top: position.y - 140 + 'px' }}
      className='-translate-x-1/2 z-[100]'
    >
      {children}
    </OverlayCard>
  )
}

export default MouseOverlayWrapper
