import React from 'react'
import styled from 'styled-components'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

interface ExampleText {
  text: string
}

const StyledDiv = styled.div`
  background: ${({ theme }) => theme.background};
  font-family: ${({ theme }) => theme.fonts};
`

function NavBar(props: ExampleText) {
  return <StyledDiv>props.text</StyledDiv>
}

export default NavBar
