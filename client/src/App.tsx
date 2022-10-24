import { WindowSize } from '@reach/window-size'
import { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import PageEmbed from './components/embed/PageEmbed'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { IsMobileContext } from './contexts/index'
import Home from './pages/Home'
import LifelineCreation from './pages/lifelineCreation'
import Settings from './pages/Settings'

function App() {
  const isMobile = useContext(IsMobileContext)

  /* Sets the lifeline modules upon load and every defaultLanguage change */
  return (
    <IsMobileContext.Provider value={isMobile ? true : false}>
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
    </IsMobileContext.Provider>
  )
}

export { App, IsMobileContext }
