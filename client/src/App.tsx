import { useState } from 'react'
import { WindowSize } from '@reach/window-size'
import { ThemeProvider } from 'styled-components'
// import { get } from './api/config'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import LanguageCustomization from './components/settings/LanguageCustomizationForm'
import LifelineCreation from './pages/lifelineCreation'
import EnterFullScreen from './components/buttons/EnterFullscreen'
import ExitFullScreen from './components/buttons/ExitFullscreen'
import Home from './pages/Home'
function App() {
  const [showFullscreenButton, setFullscreenButton] = useState(false)
  const handle = useFullScreenHandle()

  return (
    <ThemeProvider theme={theme}>
      <FullScreen
        handle={handle}
        onChange={() => setFullscreenButton(!showFullscreenButton)}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/langForm/*" element={<LanguageCustomization />} />
            <Route path="/moduleForm/*" element={<LifelineCreation />} />
            <Route path="/settings/*" element={<LanguageCustomization />} />
            <Route path="/lifelines/*" element={<LifelineCreation />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
        {showFullscreenButton ? (
          <EnterFullScreen handle={handle.enter} />
        ) : (
          <ExitFullScreen handle={handle.exit} />
        )}
      </FullScreen>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
