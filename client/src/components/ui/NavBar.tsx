import styled from 'styled-components'
import clock from '../../images/clock.png'
import toggle from '../../images/toggle.png'
// import { Link } from 'react-router-dom'

interface ExampleText {
  text: string
}

const StyledDiv = styled.div`
  background: ${({ theme }) => theme.navBackground};
  font-family: ${({ theme }) => theme.fonts};
`

const TopNav = styled.div`
  background-color: ${({ theme }) => theme.navBackground};
  overflow: hidden;
`

const Link = styled.div`
  float: right;
  color: ${({ theme }) => theme.navText};
  text-align: center;
  padding: 2vw 3vw;
  text-decoration: none;
  font-size: 17px;
`

const ActiveLink = styled.div`
  float: left;
  color: ${({ theme }) => theme.navBackground};
  text-align: center;
  padding: 2vw 3vw;
  text-decoration: none;
  font-size: 17px;
  background-color: ${({ theme }) => theme.navBackground};
  color: white;
`

const Button = styled.div`
  display: inline-flex;
`

const Image = styled.div`
  scale(0.25, 0.25);
`

function NavBar(props: ExampleText) {
  return (
    <StyledDiv>
      <TopNav>
        {/* <Link to="/"> Home</Link> */}
        <ActiveLink href="#Home">
          <Button>
            <p>Climate Clock</p>
            {/* image import not working */}
            <Image>
              <img src={clock} alt="cclock" />
            </Image>
          </Button>
        </ActiveLink>
        {/* <Link href="#Toggle">
          <Image>
            <img src={toggle} alt="toggle" />
          </Image>
        </Link> */}
        <Link href="#Settings">Settings </Link>
        <Link href="#Lifelines">Lifelines </Link>
      </TopNav>
    </StyledDiv>
  )
}

export default NavBar
