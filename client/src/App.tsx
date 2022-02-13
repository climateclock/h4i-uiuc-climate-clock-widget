import React from 'react'
import Lifeline from './components/Lifeline'

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Lifeline
        title="cool title"
        module_type="lifeline"
        value="1,800,800"
        unit="B"
      />
    </div>
  )
}

export default App
