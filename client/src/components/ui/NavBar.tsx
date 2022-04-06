import styled from 'styled-components'
import clock from '../../images/clock.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import EnterFullscreen from '../../components/buttons/EnterFullscreen'
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from 'react-full-screen'
import ExitFullscreen from '../../components/buttons/ExitFullscreen'

const StyledDiv = styled.div`
  background: ${({ theme }) => theme.navBackground};
  font-family: ${({ theme }) => theme.secondaryFonts};
`

const TopNav = styled.div`
  background-color: ${({ theme }) => theme.navBackground};
  overflow: hidden;
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
  background-color: ${({ theme }) => theme.navBackground};
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

function NavBar({ handle }: { handle: FullScreenHandle }) {
  const [showFullscreenButton, setFullscreenButton] = useState(false)
  return (
    <StyledDiv>
      <TopNav>
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
          <EnterFullscreen handle={handle.enter} />
        </FullScreenButton>
        <Link to="/settings">
          <PageLink>Settings</PageLink>
        </Link>
        <Link to="/lifelines">
          <PageLink>Lifelines</PageLink>
        </Link>
      </TopNav>
    </StyledDiv>
  )
}

export default NavBar
