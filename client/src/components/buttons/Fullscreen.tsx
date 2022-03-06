import { useState } from 'react'
import styled from 'styled-components'
const FullscreenButton = styled.div``

function Fullscreen() {
  function handleFullscreen(e) {
    if (e.requestFullscreen) {
      e.requestFullscreen()
    }
  }
  return <button onClick={() => handleFullscreen}>Fullscreen Button</button>
}

export default Fullscreen
