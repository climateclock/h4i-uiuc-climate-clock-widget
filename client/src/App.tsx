import { useState, useEffect } from 'react'
import { WindowSize } from '@reach/window-size'
import { ThemeProvider } from 'styled-components'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lifeline from './components/Lifeline'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { ModuleResInterface, NewsInterface } from './interfaces'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import Newsfeed from './components/Newsfeed'
import {
  returnFirstString,
  toUpperCase,
  getHeadlines,
} from './components/utils/utils'
// import { ThemeContext } from './contexts'
import Clock from './components/clock/Clock'
import LanguageCustomization from './components/LanguageCustomizationForm'
import LifelineCreation from './pages/lifelineCreation'
import EnterFullscreen from './components/buttons/EnterFullscreen'
import ExitFullscreen from './components/buttons/ExitFullscreen'
import { ERROR_MSG, URL } from './util/constants'
import { getData } from './util/util'
import MobileNavbar from './components/buttons/MobileNavbar'
import { Menu } from '@styled-icons/boxicons-regular'

function App() {
  const [defaultLanguage, setDefaultLanguage] = useState<string>('eng')
  const [modules, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  const [newsfeedModules, setNewsfeedModules] = useState<NewsInterface[]>([])
  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  const handle = useFullScreenHandle()
  const [showFullscreenButton, setFullscreenButton] = useState(false)
  const [navHeight, setNavHeight] = useState('0%')
  const [showMobileNavbar, setMobileNavbar] = useState(false)
  /* Sets the lifeline modules upon load and every defaultLanguage change */
  useEffect(() => {
    getData(
      URL,
      ERROR_MSG,
      setErrorFlag,
      setDefaultLanguage,
      setModules,
      setLifelineModules,
      setNewsfeedModules,
    )
  }, [defaultLanguage])

  const closeNavbar = () => {
    setNavHeight('0%')
    setMobileNavbar(!showMobileNavbar)
  }

  return (
    <ThemeProvider theme={theme}>
      <FullScreen
        handle={handle}
        onChange={() => setFullscreenButton(!showFullscreenButton)}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/langForm" element={<LanguageCustomization />} />
            <Route path="/moduleForm" element={<LifelineCreation />} />
            <Route
              path="/"
              element={
                <>
                  <Clock
                    timestamp={modules && modules[0] && modules[0].timestamp}
                  />
                  {!errorFlag ? (
                    lifelineModules.map((module) => (
                      <Lifeline
                        key={module['description']}
                        title={returnFirstString(module['labels'])}
                        module_type={toUpperCase(module['flavor'])}
                        value={module['initial']}
                        unit={returnFirstString(module['unit_labels'])}
                        rate={module['rate']}
                        resolution={module['resolution']}
                      />
                    ))
                  ) : (
                    <h1>{ERROR_MSG}</h1>
                  )}
                  {!errorFlag ? (
                    <Newsfeed headline={getHeadlines(newsfeedModules)} />
                  ) : (
                    <h1>{ERROR_MSG}</h1>
                  )}
                </>
              }
            />
          </Routes>
        </BrowserRouter>
        <WindowSize>
          {(windowSize) => <GlobalStyle windowSize={windowSize} />}
        </WindowSize>
        {showFullscreenButton ? (
          <EnterFullscreen handle={handle.enter} />
        ) : (
          <ExitFullscreen handle={handle.exit} />
        )}
      </FullScreen>
      <Menu
        size="8%"
        onClick={() => {
          setNavHeight('100%')
          setMobileNavbar(!showMobileNavbar)
        }}
      />
      {showMobileNavbar && (
        <MobileNavbar height={navHeight} closeNav={closeNavbar} />
      )}
    </ThemeProvider>
  )
}

export default App
