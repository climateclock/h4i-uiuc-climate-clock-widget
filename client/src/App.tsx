import React from 'react'
import Clock from './pages/Clock'
import { Example } from '../src/components/example/Example'

function App() {
  return (
    <div className="App">
      <Clock></Clock>
      <header className="App-header"></header>
      <Example exampleProp="test"></Example>
    </div>
  )
}

export default App
