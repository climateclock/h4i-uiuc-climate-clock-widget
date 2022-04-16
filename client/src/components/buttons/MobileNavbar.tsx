import styled from 'styled-components'
import { Link, BrowserRouter as Router } from 'react-router-dom'

const Navbar = styled.div`
  @media screen and (max-width: 800px) {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    transition: 0.5s ease;
    overflow-x: hidden;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    background-color: #111;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding-left: 200px;
  padding-right: 200px;
  font-weight: bold;
  transition: 0.2s ease;
  margin: 0.3em;
  font-size: 6vw;

  :hover {
    background-color: #1d5479;
  }
`

function MobileNavbar(props: any) {
  return (
    <Navbar style={{ height: props.height }}>
      <Router>
        <StyledLink to="">Clock</StyledLink>
        <StyledLink to="/lifeline">Lifeline</StyledLink>
        <StyledLink to="/settings">Settings</StyledLink>
        <button onClick={props.closeNav}>X</button>
      </Router>
    </Navbar>
  )
}

export default MobileNavbar
