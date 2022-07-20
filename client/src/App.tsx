import { WindowSize } from '@reach/window-size'
import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import PageEmbed from './components/embed/PageEmbed'
import LifelineCreationForm from './components/settings/LifelineCreationForm'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import Home from './pages/Home'
import Settings from './pages/Settings'

let IsMobileContext

function App() {
  const [isMobile, setIsMobile] = useState<boolean>()

  useEffect(() => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    if (Math.min(vw, vh) < 700) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])

  // archna: move to context file
  IsMobileContext = createContext(isMobile ? true : false)

  /* Sets the lifeline modules upon load and every defaultLanguage change */
  return (
    <IsMobileContext.Provider value={isMobile ? true : false}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/lifelines" element={<LifelineCreationForm />} />
            <Route path="/" element={<Home />} />
            <Route path="/embed" element={<PageEmbed />} />
          </Routes>
        </BrowserRouter>
        <WindowSize>
          {(windowSize) => <GlobalStyle windowSize={windowSize} />}
        </WindowSize>
      </ThemeProvider>
    </IsMobileContext.Provider>
  )
}

export { App, IsMobileContext }
