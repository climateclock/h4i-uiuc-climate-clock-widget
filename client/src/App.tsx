import { useState, useEffect } from 'react'
import { WindowSize } from '@reach/window-size'
import { ThemeProvider } from 'styled-components'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Lifeline from './components/Lifeline'
import { ModuleResInterface } from './interfaces'
import { get } from './api/config'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import Newsfeed from './components/Newsfeed'
import {
  returnFirstString,
  toUpperCase,
  getHeadlines,
} from './components/utils/utils'
import { ThemeContext } from './contexts'
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
    )
  }, [defaultLanguage])

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
        </Routes>
      </BrowserRouter>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
