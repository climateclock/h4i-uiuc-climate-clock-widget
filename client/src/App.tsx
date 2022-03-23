import { useState, useEffect } from 'react'
import { WindowSize } from '@reach/window-size'
import { ThemeProvider } from 'styled-components'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Lifeline from './components/Lifeline'
import { ModuleResInterface } from './interfaces'
import { get } from './api/config'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import Clock from './components/clock/Clock'
import LanguageCustomization from './components/LanguageCustomizationForm'
import LifelineCreation from './pages/lifelineCreation'
import {
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from './util/constants'

function App() {
  const [defaultLanguage, setDefaultLanguage] = useState<string>('eng')
  const [modules, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  const ERROR_MSG: string = 'Error retrieving module data from API...'

  /* Sets the lifeline modules upon load and every defaultLanguage change */
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
        return
      }

      let resModules: ModuleResInterface[] = Object.values(
        res['data']['data']['modules'],
      )
      setModules(resModules)

      if (!localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY)) {
        let resLifelineModules = resModules.filter((module) => {
          if (module['type'] === 'value' && module['flavor'] === 'lifeline') {
            return true
          }
          return false
        })
        setLifelineModules(resLifelineModules)

        /* stores lifeline modules in local storage */
        localStorage.setItem(
          LIFELINES_LOCAL_STORAGE_KEY,
          JSON.stringify(resLifelineModules),
        )
      } else {
        const ll = localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY)
        if (ll) setLifelineModules(JSON.parse(ll))
      }

      /* set the default langauge if in localstorage, else default to 'eng' */
      const lang = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY)
      if (!lang)
        localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, defaultLanguage)
      else setDefaultLanguage(lang)
    }

    getData(URL, ERROR_MSG)
  }, [defaultLanguage])

  /* sets the defaultLanguage in local storage if doesn't exist */
  useEffect(() => {}, [])

  /* returnFirstString
   *
   * Description: Used to return first element in an array
   *                ie. API returns unit_labels as an array so we need to return first element if unit_labels
   *                    sent in API response, else return empty string
   */
  const returnFirstString = (array: string[] | undefined) => {
    if (array === undefined || !array.length) {
      return ''
    }
    return array[0]
  }

  /* toUpperCase
   *
   * Description: Used to capitalize element if not undefined, else return empty string
   *                ie. API returns flavor which needs to be captialized if unit_labels
   *                    sent in API response, else return empty string
   */
  const toUpperCase = (str: string | undefined) => {
    if (str === undefined) {
      return ''
    }
    return str.toUpperCase()
  }

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
