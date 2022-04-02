import styled from 'styled-components'
import { FullscreenExit } from '@styled-icons/open-iconic'
const ExitButton = styled.div`
  color: white;
  top: 500px;
  width: 500px;
`

function ExitFullscreen({ handle }: { handle: any }) {
  return (
    <ExitButton>
      <FullscreenExit onClick={handle} size="5%" />
    </ExitButton>
  )
}

export default ExitFullscreen
