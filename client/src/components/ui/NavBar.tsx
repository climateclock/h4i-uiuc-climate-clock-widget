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

const NavBox = styled.div<{
  isFullScreen: boolean
  mobileWidth: boolean
  inBounds: boolean
  showMobileNavbar?: boolean
}>`
  font-family: ${({ theme }) => theme.secondaryFonts};

  ${(props) =>
    props.isFullScreen ? 'position: absolute;' : 'overflow: hidden;'}
  width: 100%;
  ${(props) => (props.mobileWidth ? 'height: 2vh;' : 'height: 55px;')}

  z-index: 11;
  background-color: ${({ theme }) => theme.black};

  margin-top: ${(props) =>
    props.isFullScreen && !props.inBounds ? '-55px' : '0px'};

  transition: 0.3s ease-out;
  ${(props) =>
    props.showMobileNavbar ? 'position: absolute' : 'position: relative'};
`

const PageLink = styled.div`
  align-items: center;
  float: right;
  color: ${({ theme }) => theme.navBarText};
  text-align: center;
  padding: 20px 40px;
  text-decoration: none;
  font-size: 1em;
  font-weight: bold;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

const FullScreenButton = styled.div<{ mobileWidth: boolean }>`
  float: right;
  ${(props) =>
    props.mobileWidth ? 'padding: 18px 5vw;' : 'padding: 18px 35px 0px 40px'}
`

const StyledCloseOutline = styled(CloseOutline)`
  float: right;
  color: white;
  padding-top: 10px;
  padding-right: 3vw;
  size: 2.5em;
  display: block;

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

/*
The padding is slightly weird; however, the logo's left-padding should match that of the deadline
So, if that changes, so should this value
*/
const HomeLink = styled.div`
  float: left;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.black};
  text-align: center;
  padding-top: 20px;
  padding-left: min(35px, 3vw);
  text-decoration: none;
  font-size: 18.5px;
  font-weight: bold;
  color: white;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

const Button = styled.div`
  display: inline-flex;
`

const Logo = styled.img`
  padding-left: 10px;
`

const StyledMenu = styled(Menu)`
  float: right;
  padding-top: 10px;
  padding-right: 3vw;
  color: white;
  size: 2.5em;
  display: block;
`

function NavBar({
  handle,
  isFullScreen,
  atHome,
}: {
  handle: FullScreenHandle
  isFullScreen: boolean
  atHome: boolean
}) {
  const [mobileWidth, setMobileWidth] = useState(
    window.matchMedia('(max-width: 800px)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(max-width: 800px)')

    // Safari doesn't support addEventListener
    try {
      query.addEventListener('change', (e) => setMobileWidth(e.matches))
    } catch (e1) {
      try {
        // eslint-disable-next-line
        /* tslint:disable-next-line */
        query.addListener((e) => setMobileWidth(e.matches))

        console.log('tried alternative')
      } catch (e2) {
        console.error(e2)
      }
    }
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
    <>
      <NavBox
        showMobileNavbar={showMobileNavbar}
        isFullScreen={!isFullScreen}
        inBounds={MouseTrack()}
        mobileWidth={mobileWidth}
      >
        <Link to="/">
          <HomeLink>
            <Button>
              Climate Clock
              <Logo
                src={clock}
                alt="climate_clock_logo"
                height="25px"
                width="25px"
              />
            </Button>
          </HomeLink>
        </Link>
        {mobileWidth && [
          !showMobileNavbar ? (
            <StyledMenu
              size="2.5em"
              onClick={() => {
                setMobileNavbar(!showMobileNavbar)
              }}
            />
          ) : (
            <StyledCloseOutline
              size="2.5em"
              onClick={() => {
                setMobileNavbar(!showMobileNavbar)
              }}
            />
          ),
        ]}
        {atHome ? (
          <FullScreenButton mobileWidth={mobileWidth}>
            {isFullScreen ? (
              <EnterFullscreen handle={handle} />
            ) : (
              <ExitFullscreen handle={handle} />
            )}
          </FullScreenButton>
        ) : (
          ' '
        )}
        {!mobileWidth && (
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
    </>
  )
}

export default NavBar
