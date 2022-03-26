import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { WindowSize } from '@reach/window-size'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Lifeline from './components/Lifeline'
import { ModuleResInterface, NewsInterface } from './interfaces'
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

function App() {
  const [defaultLanguage, setDefaultLanguage] = useState<string>('eng')
  const [modules, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  const [newsfeedModules, setNewsfeedModules] = useState<NewsInterface[]>([])
  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  const ERROR_MSG: string = 'Error retrieving module data from API...'

  useEffect(() => {
    let URL: string = 'https://api.climateclock.world/v1/clock'
    // let URL: string = `https://api.climateclock.world/v1/clock?lang=${defaultLanguage}`

    const getData = async (url: string, error: string) => {
      let res: any = await get(url, error)

      /* errorWrapper returned in res */
      if ('error' in res) {
        setErrorFlag(true)
        setModules([])
        setLifelineModules([])
        setNewsfeedModules([])
        return
      }

      let resModules: ModuleResInterface[] = Object.values(
        res['data']['data']['modules'],
      )
      let resLifelineModules = resModules.filter((module) => {
        if (module['type'] === 'value' && module['flavor'] === 'lifeline') {
          return true
        }
        return false
      })
      let resNewsfeedModules: NewsInterface[] = Object.values(
        res['data']['data']['modules']['newsfeed_1']['newsfeed'],
      )

      setModules(resModules)
      setLifelineModules(resLifelineModules)
      setNewsfeedModules(resNewsfeedModules)
    }

    getData(URL, ERROR_MSG)
  }, [defaultLanguage])

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider
        value={{
          defaultLanguage,
          setDefaultLanguage,
          lifelineModules,
          setLifelineModules,
        }}
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
                    <Newsfeed
                      headline={getHeadlines(newsfeedModules)}
                    ></Newsfeed>
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
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

export default App
