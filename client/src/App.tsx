import Lifeline from './components/Lifeline'
import { ModuleResInterface, NewsInterface } from './interfaces'
import { get } from './api/config'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { WindowSize } from '@reach/window-size'
import Newsfeed from './components/Newsfeed'
import {
  returnFirstString,
  toUpperCase,
  concatHeadline,
} from './components/utils/utils'

function App() {
  const [, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  // set a useState to store newsfeed modules
  const [newsfeedModules, setNewsfeedModules] = useState<NewsInterface[]>([])
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
      let resNewsfeedModules: NewsInterface[] = Object.values(
        res['data']['data']['modules']['newsfeed_1']['newsfeed'],
      )

      console.log(resNewsfeedModules)
      setModules(resModules)
      setLifelineModules(resLifelineModules)
      setNewsfeedModules(resNewsfeedModules)
    }

    getData(URL, ERROR_MSG)
  }, [])

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
          <Newsfeed headline={concatHeadline(newsfeedModules)}></Newsfeed>
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
