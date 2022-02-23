import React from 'react'
import Clock from './pages/Clock'
import { Example } from '../src/components/example/Example'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { WindowSize } from '@reach/window-size'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header"></header>
        <Clock></Clock>
      </div>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
