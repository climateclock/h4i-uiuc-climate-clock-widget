import { useState, useEffect } from 'react'
import { WindowSize } from '@reach/window-size'
import { ThemeProvider } from 'styled-components'
import {
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from './util/constants'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  decompressFromEncodedURIComponent,
  compressToEncodedURIComponent,
} from 'lz-string'
import Lifeline from './components/Lifeline'
import { ModuleResInterface, NewsInterface } from './interfaces'
// import { get } from './api/config'
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
import { ERROR_MSG, URL } from './util/constants'
import { getData } from './util/util'

function App() {
  const [defaultLanguage, setDefaultLanguage] = useState<string>('eng')
  const [modules, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  const [newsfeedModules, setNewsfeedModules] = useState<NewsInterface[]>([])
  const [errorFlag, setErrorFlag] = useState<boolean>(false)

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

  let settings = {
    language: { defaultLanguage },
    lifeline: { lifelineModules },
    // TODO: add for whether ticker will show up
  }
  const settingsJSON = JSON.stringify(settings)
  let compressed = compressToEncodedURIComponent(settingsJSON)
  let decompressed = JSON.parse(decompressFromEncodedURIComponent(compressed))
  console.log(decompressed)
  return (
    <ThemeProvider theme={theme}>
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
        </Routes>
      </BrowserRouter>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
