import { useState } from 'react'
import styled from 'styled-components'
import { useFullScreenHandle } from 'react-full-screen'
const FullscreenButton = styled.div``

function Fullscreen() {
  const handle = useFullScreenHandle()
  return <button onClick={handle.enter}>Fullscreen Button</button>
}

export default Fullscreen
