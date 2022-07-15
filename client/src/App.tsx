import { WindowSize } from '@reach/window-size'
import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import PageEmbed from './components/embed/PageEmbed'
import LifelineCreationForm from './components/settings/LifelineCreationForm'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import Home from './pages/Home'
import Settings from './pages/Settings'

let IsMobileContext;

function App() {
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(navigator.userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [])

  // archna: move to context file
  IsMobileContext = createContext(isMobile ? true : false);

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
