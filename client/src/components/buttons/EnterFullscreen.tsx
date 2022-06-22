import { FullscreenEnter } from '@styled-icons/open-iconic'
import { FullScreenHandle } from 'react-full-screen'
import styled from 'styled-components'

const StyledFullScreenEnter = styled(FullscreenEnter)`
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);

  color: ${({ theme }) => theme.navBarText};

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

function EnterFullScreen({ handle }: { handle: FullScreenHandle }) {
  return <StyledFullScreenEnter size="20px" onClick={handle.enter} />
}
export default EnterFullScreen
