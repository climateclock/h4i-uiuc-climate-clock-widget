import React from 'react'
import { Example } from '../src/components/example/Example'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { WindowSize } from '@reach/window-size'
import NavBar from './components/ui/NavBar'
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from 'react-router-dom'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header"></header>
        <Example exampleProp="test"></Example>
        <NavBar text="test"></NavBar>
      </div>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
