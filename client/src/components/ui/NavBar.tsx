import React from 'react'
import styled from 'styled-components'
import * as ReactDOM from 'react-dom'
import clock from './images/clock.png'
// import { Link } from 'react-router-dom'

interface ExampleText {
  text: string
}

const StyledDiv = styled.div`
  background: ${({ theme }) => theme.background};
  font-family: ${({ theme }) => theme.fonts};
`

const TopNav = styled.div`
  background-color: ${({ theme }) => theme.headerText};
  overflow: hidden;
`

const Link = styled.div`
  float: right;
  color: ${({ theme }) => theme.navBackground};
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
  background-color: ${({ theme }) => theme.headerText};
  color: white;
`

const Button = styled.div`
  display: flex;
`

function NavBar(props: ExampleText) {
  return (
    <StyledDiv>
      <TopNav>
        {/* <Link to="/"> Home</Link> */}
        <ActiveLink href="#Home">
          <Button>
            <p>Climate Clock</p>
            <img src="./images/clock.png" alt="cclock" />
          </Button>
        </ActiveLink>
        <Link href="#Lifelines">Lifelines </Link>
        <Link href="#Settings">Settings </Link>
      </TopNav>
    </StyledDiv>
  )
}

export default NavBar
