import { Menu } from '@styled-icons/boxicons-regular'
import { useState, useEffect } from 'react'
import MobileBar from './MobileBar'
import clock from '../../images/clock.png'
import styled from 'styled-components'

import EnterFullscreen from '../../components/buttons/EnterFullscreen'
import { FullScreenHandle } from 'react-full-screen'
import ExitFullscreen from '../../components/buttons/ExitFullscreen'

const MobileNavBox = styled.div`
  font-family: ${({ theme }) => theme.secondaryFonts};
  ${(props) =>
    props.isFullScreen ? 'position: absolute;' : 'overflow: hidden;'}
  width: 100%;
  height: 6vh;
  z-index: 30;
  background-color: ${({ theme }) => theme.black};

  margin-top: ${(props) =>
    props.isFullScreen && !props.inBounds ? '-6.25em' : '0px'};

  transform: ${(props) =>
    props.isFullScreen && !props.inBounds
      ? 'translateY(-12.5em)'
      : 'translateY(0px)'};
  transition: 0.3s ease-out;
`

const MobileFullScreenButton = styled.div`
  float: right;
  color: ${({ theme }) => theme.navBarText};
  padding: 1vw 3vw;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

const MobileHomeLink = styled.div`
  float: left;
  color: ${({ theme }) => theme.black};
  text-align: center;
  padding: 2vw 2vw;
  text-decoration: none;
  font-size: 17px;
  color: white;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

const Button = styled.div`
  display: inline-flex;
`

const MobileImage = styled.div`
  padding-left: 0.3vw;
  scale(0.1, 0.1);
`

const StyledMenu = styled.div`
  display: inline-flex;
  color: white;
  float: right;
`

function MobileNavbar({
  handle,
  isFullScreen,
}: {
  handle: FullScreenHandle
  isFullScreen: boolean
}) {
  const [showMobileNavbar, setMobileNavbar] = useState(false)
  const closeNavbar = () => {
    setMobileNavbar(!showMobileNavbar)
  }
  return (
    <MobileNavBox isFullScreen={!isFullScreen}>
      <MobileHomeLink>
        <Button>
          Climate Clock
          <MobileImage>
            <img src={clock} alt="climate_clock_logo" />
          </MobileImage>
        </Button>
      </MobileHomeLink>
      <MobileFullScreenButton>
        {isFullScreen ? (
          <EnterFullscreen handle={handle.enter} />
        ) : (
          <ExitFullscreen handle={handle.exit} />
        )}
      </MobileFullScreenButton>
      <StyledMenu>
        <Menu
          size="8%"
          onClick={() => {
            setMobileNavbar(!showMobileNavbar)
          }}
        />
      </StyledMenu>
      <MobileBar showMobileNavbar={showMobileNavbar} closeNav={closeNavbar} />
    </MobileNavBox>
  )
}

export default MobileNavbar
