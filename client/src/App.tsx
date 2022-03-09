import Lifeline from './components/Lifeline'
import { ModuleResInterface, NewsfeedPropsInterface } from './interfaces'
import { get } from './api/config'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { WindowSize } from '@reach/window-size'
import Newsfeed from './components/Newsfeed'

function App() {
  const headlines: string[] = [
    'US EPA will regulate methane for the first time | ',
    'Ghana youth climate defenders present Climate Clock to President Akufo-Addo at COP26 | ',
    'World leaders at COP26 sign declaration to end deforestation by 2030 | ',
    'Indigenous Peoples to get $1.7bn in recognition of their key role in protecting land and forests | ',
    'UK’s Treasury to demand companies to disclose their environmental impact | ',
    'Uruguay leads renewable energy charge in Latin America with nearly 100% renewables | ',
    'Cement industry pledges to reach net zero by 2050 without offsets | ',
    'South Africa strengthens national climate targets after pressure from activists | ',
    'The U.S. commits to slash 85% of HFC super-pollutants over next 15 years | ',
    'China to stop funding coal-fired power projects abroad in lead up to COP26 |',
  ]
  // const headlines2: string[] = [
  //   'US EPA will regulate methane for the first time | ',
  //   'Ghana youth climate defenders present Climate Clock to President Akufo-Addo at COP26 | ',
  // ]
  const [, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  // set a useState to store newsfeed modules
  const [newsfeedModules, setNewsfeedModules] = useState<
    NewsfeedPropsInterface[]
  >([])
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
        setNewsfeedModules([])
        return
      }

      let resModules: ModuleResInterface[] = Object.values(
        res['data']['data']['modules'],
      )
      let resLifelineModules = resModules.filter((module) => {
        if (module['type'] === 'value' && module['flavor'] === 'lifeline') {
          console.log(module)
          return true
        }
        return false
      })
      let resNewsfeedModules: NewsfeedPropsInterface[] = Object.values(
        res['data']['data']['modules']['newsfeed_1']['newsfeed'],
      )
      setModules(resModules)
      setLifelineModules(resLifelineModules)
      setNewsfeedModules(resNewsfeedModules)
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
        {!errorFlag ? (
          newsfeedModules.map((module) => (
            <Newsfeed headline={module['headline']}></Newsfeed>
          ))
        ) : (
          <h1>{ERROR_MSG}</h1>
        )}
      </div>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
