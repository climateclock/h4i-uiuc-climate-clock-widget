import { useEffect, useState } from 'react'
import { WindowSize } from '@reach/window-size'
import { ThemeProvider } from 'styled-components'
import {
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from './utils/constants'
import {
  decompressFromEncodedURIComponent,
  compressToEncodedURIComponent,
} from 'lz-string'
import { ModuleResInterface, NewsInterface } from './interfaces'
// import { get } from './api/config'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import LanguageCustomization from './components/settings/LanguageCustomizationForm'
import LifelineCreation from './pages/lifelineCreation'
import EnterFullScreen from './components/buttons/EnterFullscreen'
import ExitFullScreen from './components/buttons/ExitFullscreen'
import Home from './pages/Home'
import { getData } from './utils/utils'
import { URL, ERROR_MSG } from './utils/constants'

function App() {
  const [showFullscreenButton, setFullscreenButton] = useState(false)
  /* Sets the lifeline modules upon load and every defaultLanguage change */
  const [defaultLanguage, setDefaultLanguage] = useState<string>('eng')
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  const [, setModules] = useState<ModuleResInterface[]>([])
  const [, setErrorFlag] = useState<boolean>(false)
  const [, setNewsfeedModules] = useState<NewsInterface[]>([])

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

  let settings = {
    language: { defaultLanguage },
    lifeline: { lifelineModules },
    // TODO: add for whether ticker will show up
  }
  const handle = useFullScreenHandle()
  const settingsJSON = JSON.stringify(settings)
  let compressed = compressToEncodedURIComponent(settingsJSON)
  let decompressed = JSON.parse(decompressFromEncodedURIComponent(compressed))
  console.log(decompressed)
  return (
    <ThemeProvider theme={theme}>
      <FullScreen
        handle={handle}
        onChange={() => setFullscreenButton(!showFullscreenButton)}
      >
        {' '}
        {console.log(defaultLanguage)}
        <BrowserRouter>
          <Routes>
            <Route path="/langForm" element={<LanguageCustomization />} />
            {console.log(localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY))}
            <Route path="/moduleForm" element={<LifelineCreation />} />

            <Route
              path={`${compressed}`}
              {...(localStorage.setItem(
                LANGUAGE_LOCAL_STORAGE_KEY,
                decompressed.language.defaultLanguage,
              ),
              localStorage.setItem(
                LIFELINES_LOCAL_STORAGE_KEY,
                decompressed.lifeline.lifelineModules,
              ))}
            />

            <Route path="/settings" element={<LanguageCustomization />} />
            <Route path="/lifelines" element={<LifelineCreation />} />
            <Route path="/" element={<Home />} />

            {console.log(defaultLanguage)}
            {console.log(decompressed.language.defaultLanguage)}
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
