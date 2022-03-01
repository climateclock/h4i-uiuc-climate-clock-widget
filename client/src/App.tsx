import Lifeline from './components/Lifeline'
import { ModuleResInterface } from './interfaces'
import { get } from './api/config'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { WindowSize } from '@reach/window-size'

function App() {
  const [modules, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )

  useEffect(() => {
    let URL: string = 'https://api.climateclock.world/v1/clock'
    let ERROR_MSG: string = 'Error getting module data'

    const getData = async (url: string, error: string) => {
      let res = await get(url, error)
      let resModules: ModuleResInterface[] = Object.values(
        res['data']['data']['modules'],
      )
      let resLifelineModules = resModules.filter((module) => {
        if (module['type'] === 'value' && module['flavor'] === 'lifeline') {
          return module
        }
      })
      setModules(resModules)
      setLifelineModules(resLifelineModules)
    }

    getData(URL, ERROR_MSG)
  }, [])

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
      <div className="App">
        <header className="App-header"></header>
        {lifelineModules.map((module) => (
          <Lifeline
            key={module['description']}
            title={returnFirstString(module['labels'])}
            module_type={toUpperCase(module['flavor'])}
            value={module['initial']}
            unit={returnFirstString(module['unit_labels'])}
            rate={module['rate']}
            resolution={module['resolution']}
          />
        ))}
      </div>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
