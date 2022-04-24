import { FullscreenEnter } from '@styled-icons/open-iconic'
import { FullScreenHandle } from 'react-full-screen'

function EnterFullScreen({ handle }: { handle: FullScreenHandle }) {
  return <FullscreenEnter size="2%" onClick={handle.enter} />
}
export default EnterFullScreen
