import styled from 'styled-components'
import clock from '../../images/clock.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import EnterFullscreen from '../../components/buttons/EnterFullscreen'
import { FullScreenHandle } from 'react-full-screen'
import ExitFullscreen from '../../components/buttons/ExitFullscreen'

const NavBox = styled.div`
  font-family: ${({ theme }) => theme.secondaryFonts};
  ${(props) =>
    props.isFullScreen ? 'position: absolute;' : 'overflow: hidden;'}
  width: 100%;
  z-index: 4;
  background-color: ${({ theme }) => theme.navBackground};

  margin-top: ${(props) =>
    props.isFullScreen && !props.inBounds ? '-100px' : '0px'};

  transform: ${(props) =>
    props.isFullScreen && !props.inBounds
      ? 'translateY(-200px)'
      : 'translateY(0px)'};
  transition: 0.3s ease-out;
`

const PageLink = styled.div`
  float: right;
  color: ${({ theme }) => theme.navText};
  text-align: center;
  padding: 2vw 3vw;
  text-decoration: none;
  font-size: 17px;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

const FullScreenButton = styled.div`
  float: right;
  color: ${({ theme }) => theme.navText};
  padding: 2vw 3vw;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

const HomeLink = styled.div`
  float: left;
  color: ${({ theme }) => theme.navBackground};
  text-align: center;
  padding: 2vw 3vw;
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

const Image = styled.div`
  scale(0.25, 0.25);
`

function NavBar({
  handle,
  isFullScreen,
}: {
  handle: FullScreenHandle
  isFullScreen: boolean
}) {
  function MouseTrack(): boolean {
    const [y, setY] = useState()
    useEffect(() => {
      const update = (e) => {
        setY(e.y)
      }
      window.addEventListener('mousemove', update)
      window.addEventListener('touchmove', update)
      return () => {
        window.removeEventListener('mousemove', update)
        window.removeEventListener('touchmove', update)
      }
    })
    return y && y <= 100 ? true : false
  }
  return (
    <NavBox isFullScreen={!isFullScreen} inBounds={MouseTrack()}>
      <Link to="/">
        <HomeLink>
          <Button>
            Climate Clock
            <Image>
              <img src={clock} alt="cclock" />
            </Image>
          </Button>
        </HomeLink>
      </Link>
      <FullScreenButton>
        {isFullScreen ? (
          <EnterFullscreen handle={handle.enter} />
        ) : (
          <ExitFullscreen handle={handle.exit} />
        )}
      </FullScreenButton>
      <Link to="/settings">
        <PageLink>Settings</PageLink>
      </Link>
      <Link to="/lifelines">
        <PageLink>Lifelines</PageLink>
      </Link>
    </NavBox>
  )
}

export default NavBar
