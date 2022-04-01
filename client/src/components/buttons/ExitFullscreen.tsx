import styled from 'styled-components'
import { FullscreenExit } from '@styled-icons/open-iconic'
const ExitButton = styled.div`
  position: absolute;
  top: 50px;
  width: 50px;
`

function ExitFullscreen({ handle }: { handle: any }) {
  return (
    <ExitButton>
      <FullscreenExit onClick={handle} size="50%" />
    </ExitButton>
  )
}

export default ExitFullscreen
