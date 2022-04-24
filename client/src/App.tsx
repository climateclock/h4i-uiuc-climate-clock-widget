import { WindowSize } from '@reach/window-size'
import { useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import EnterFullScreen from './components/buttons/EnterFullscreen'
import ExitFullScreen from './components/buttons/ExitFullscreen'
import LanguageCustomization from './components/settings/LanguageCustomizationForm'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import Home from './pages/Home'
import LifelineCreation from './pages/lifelineCreation'

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
            <Route path="/settings" element={<LanguageCustomization />} />
            <Route path="/lifelines" element={<LifelineCreation />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>

        {showFullscreenButton ? (
          <EnterFullScreen handle={handle} />
        ) : (
          <ExitFullScreen handle={handle} />
        )}
      </FullScreen>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
