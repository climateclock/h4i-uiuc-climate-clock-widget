import styled from 'styled-components'
import { FullscreenExit } from '@styled-icons/open-iconic'
const ExitButton = styled.div`
  color: white;
`

function ExitFullScreen({ handle }: { handle: any }) {
  return (
    <ExitButton>
      <FullscreenExit onClick={handle} width="20px" />
    </ExitButton>
  )
}

export default ExitFullScreen
