import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { FullscreenEnter } from '@styled-icons/open-iconic'
import { useLinkClickHandler } from 'react-router-dom'

function EnterFullscreen({ handle }: { handle: any }) {
  return <FullscreenEnter size="2%" onClick={handle} />
}
export default EnterFullscreen
