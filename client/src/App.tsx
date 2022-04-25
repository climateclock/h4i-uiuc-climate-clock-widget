import { WindowSize } from '@reach/window-size'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import Settings from './pages/Settings'
import LifelineCreation from './pages/lifelineCreation'
import Home from './pages/Home'
import PageEmbed from './components/embed/PageEmbed'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useState } from 'react'

function App() {
  const [showFullscreenButton, setFullscreenButton] = useState(false)
  /* Sets the lifeline modules upon load and every defaultLanguage change */
  const handle = useFullScreenHandle()
  return (
    <ThemeProvider theme={theme}>
      <FullScreen
        handle={handle}
        onChange={() => setFullscreenButton(!showFullscreenButton)}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/lifelines" element={<LifelineCreation />} />
            <Route path="/" element={<Home />} />
            <Route path="/embed" element={<PageEmbed />} />
          </Routes>
        </BrowserRouter>
      </FullScreen>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
