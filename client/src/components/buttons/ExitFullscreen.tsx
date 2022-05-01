import { FullscreenExit } from '@styled-icons/open-iconic'
import { FullScreenHandle } from 'react-full-screen'
import styled from 'styled-components'

const ExitButton = styled.div`
  color: white;
`

function ExitFullScreen({ handle }: { handle: FullScreenHandle }) {
  return (
    <ExitButton>
      <FullscreenExit onClick={handle.exit} size="20px" />
    </ExitButton>
  )
}

export default ExitFullScreen
