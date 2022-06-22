import { FullscreenExit } from '@styled-icons/open-iconic'
import { FullScreenHandle } from 'react-full-screen'
import styled from 'styled-components'

const StyledFullscreenExit = styled(FullscreenExit)`
  color: ${({ theme }) => theme.navBarText};

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

function ExitFullScreen({ handle }: { handle: FullScreenHandle }) {
  return (
    <StyledFullscreenExit onClick={handle.exit} size="20px" />
  )
}

export default ExitFullScreen
