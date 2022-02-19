import React from 'react'
import Clock from './pages/Clock'
import { Example } from '../src/components/example/Example'
import { ThemeProvider } from 'styled-components'
import { theme } from './components/ui/GlobalStyle'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header"></header>
        <Clock></Clock>
        <Example exampleProp="test"></Example>
      </div>
    </ThemeProvider>
  )
}

export default App
