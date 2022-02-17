import React from 'react'
import { Example } from '../src/components/example/Example'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header"></header>
        <Example exampleProp="test"></Example>
      </div>
    </ThemeProvider/>
  )
}

export default App
