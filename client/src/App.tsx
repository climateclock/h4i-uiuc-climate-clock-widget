import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './components/ui/GlobalStyle'
import Clock from './components/clock/Clock'
import { get } from './api/config'
import { ModuleResInterface } from './interfaces'

function App() {
  const [modules, setModules] = useState<ModuleResInterface[]>([])
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
        return
      }
      let content: ModuleResInterface[] = Object.values(
        res['data']['data']['modules'],
      )
      setModules(content)
    }

    getData(URL, ERROR_MSG)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div>
        {!errorFlag ? (
          <Clock
            timestamp={modules && modules[0] && modules[0].timestamp}
          ></Clock>
        ) : (
          <h1>{ERROR_MSG}</h1>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
