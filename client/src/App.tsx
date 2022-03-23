import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { WindowSize } from '@reach/window-size'
import Lifeline from './components/Lifeline'
import { ModuleResInterface } from './interfaces'
import { get } from './api/config'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { ThemeContext } from './contexts'
import Clock from './components/clock/Clock'
import LanguageCustomization from './components/LanguageCustomizationForm'

function App() {
  const [defaultLanguage, setDefaultLanguage] = useState<string>('eng')
  const [modules, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
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
      setModules(resModules)
      setLifelineModules(resLifelineModules)
    }

    getData(URL, ERROR_MSG)
  }, [defaultLanguage])

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
      <ThemeContext.Provider
        value={{
          defaultLanguage,
          setDefaultLanguage,
          lifelineModules,
          setLifelineModules,
        }}
      >
        <LanguageCustomization />
        <h1>{defaultLanguage}</h1>
        {/*<div className="App"></div>*/}
        <header className="App-header"></header>
        {!errorFlag ? (
          <Clock timestamp={modules && modules[0] && modules[0].timestamp} />
        ) : (
          <h1>{ERROR_MSG}</h1>
        )}
        {!errorFlag ? (
          lifelineModules.map((module) => (
            <Lifeline
              key={returnFirstString(module['labels'])}
              title={toUpperCase(returnFirstString(module['labels']))}
              module_type={toUpperCase(module['flavor'])}
              value={module['initial']}
              unit={toUpperCase(returnFirstString(module['unit_labels']))}
              rate={module['rate']}
              resolution={module['resolution']}
            />
          ))
        ) : (
          <h1>{ERROR_MSG}</h1>
        )}

        <WindowSize>
          {(windowSize) => <GlobalStyle windowSize={windowSize} />}
        </WindowSize>
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

export default App
