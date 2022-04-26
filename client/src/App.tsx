import { WindowSize } from '@reach/window-size'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import Settings from './pages/Settings'
import LifelineCreation from './pages/lifelineCreation'
import Home from './pages/Home'
import PageEmbed from './components/embed/PageEmbed'

function App() {
  /* Sets the lifeline modules upon load and every defaultLanguage change */
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/lifelines" element={<LifelineCreation />} />
          <Route path="/" element={<Home />} />
          <Route path="/embed" element={<PageEmbed />} />
        </Routes>
      </BrowserRouter>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
