import Lifeline from './components/Lifeline'
import { ModuleResInterface } from './interfaces'
import { get } from './api/config'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './components/ui/GlobalStyle'
import Clock from './components/clock/Clock'
import { get } from './api/config'
import { ModuleResInterface } from './interfaces'
import Toggle from './components/buttons/Toggle'

function App() {
  const [, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  const ERROR_MSG: string = 'Error retrieving module data from API...'

  useEffect(() => {
    let URL: string = 'https://api.climateclock.world/v1/clock'

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
      </div>
    </ThemeProvider>
  )
}

export default App
