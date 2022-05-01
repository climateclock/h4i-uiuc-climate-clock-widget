import { Menu } from '@styled-icons/boxicons-regular'
import { CloseOutline } from '@styled-icons/evaicons-outline'
import { useEffect, useState } from 'react'
import { FullScreenHandle } from 'react-full-screen'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import EnterFullscreen from '../../components/buttons/EnterFullscreen'
import ExitFullscreen from '../../components/buttons/ExitFullscreen'
import clock from '../../images/clock.png'
import MobileBar from '../buttons/MobileBar'

const NavBox = styled.div`
  font-family: ${({ theme }) => theme.secondaryFonts};

  ${(props) =>
    props.isFullScreen ? 'position: absolute;' : 'overflow: hidden;'}
  width: 100%;
  height: 8vh;
  z-index: 11;
  background-color: ${({ theme }) => theme.black};

  margin-top: ${(props) =>
    props.isFullScreen && !props.inBounds ? '-6.25em' : '0px'};

  transform: ${(props) =>
    props.isFullScreen && !props.inBounds
      ? 'translateY(-12.5em)'
      : 'translateY(0px)'};
  transition: 0.3s ease-out;
  ${(props) =>
    props.showMobileNavbar ? 'position: absolute' : 'position: relative'}
`

const PageLink = styled.div`
  align-items: center;
  float: right;
  color: ${({ theme }) => theme.navBarText};
  text-align: center;
  padding: 2vw 3vw;
  text-decoration: none;
  font-size: 1em;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

const FullScreenButton = styled.div`
  float: right;
  color: ${({ theme }) => theme.navBarText};
  padding: 2vw 3vw;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

const HomeLink = styled.div`
  float: left;
  color: ${({ theme }) => theme.black};
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
  padding-left: 0.75vw;
  scale(0.25, 0.25);
`

function NavBar({
  handle,
  isFullScreen,
}: {
  handle: FullScreenHandle
  isFullScreen: boolean
}) {
  const [mobileWidth, setMobileWidth] = useState(
    window.matchMedia('(max-width: 800px)').matches,
  )
  useEffect(() => {
    window
      .matchMedia('(max-width: 800px)')
      .addEventListener('change', (e) => setMobileWidth(e.matches))
  }, [])

  const [showMobileNavbar, setMobileNavbar] = useState(false)

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
    <div>
      <NavBox isFullScreen={!isFullScreen} inBounds={MouseTrack()}>
        <Link to="/">
          <HomeLink>
            <Button>
              Climate Clock
              <Image>
                <img src={clock} alt="climate_clock_logo" />
              </Image>
            </Button>
          </HomeLink>
        </Link>
        <FullScreenButton>
          {isFullScreen ? (
            <EnterFullscreen handle={handle} />
          ) : (
            <ExitFullscreen handle={handle} />
          )}
        </FullScreenButton>
        {mobileWidth ? (
          [
            !showMobileNavbar ? (
              <Menu
                style={{ float: 'right', color: 'white' }}
                size="2.5em"
                onClick={() => {
                  setMobileNavbar(!showMobileNavbar)
                }}
              />
            ) : (
              <CloseOutline
                style={{ float: 'right', color: 'white' }}
                size="2.5em"
                onClick={() => {
                  setMobileNavbar(!showMobileNavbar)
                }}
              />
            ),
          ]
        ) : (
          <>
            <Link to="/settings">
              <PageLink>Settings</PageLink>
            </Link>
            <Link to="/lifelines">
              <PageLink>Lifelines</PageLink>
            </Link>
          </>
        )}
      </NavBox>
      {mobileWidth && <MobileBar showMobileNavbar={showMobileNavbar} />}
    </div>
  )
}

export default NavBar
