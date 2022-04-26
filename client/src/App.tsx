import { WindowSize } from '@reach/window-size'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import PageEmbed from './components/embed/PageEmbed'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import Home from './pages/Home'
import LifelineCreation from './pages/lifelineCreation'
import Settings from './pages/Settings'

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
