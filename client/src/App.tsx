import React, { useState, useEffect } from 'react'
import { Example } from '../src/components/example/Example'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { WindowSize } from '@reach/window-size'
import Clock from './components/clock/Clock'
import { get } from './api/config'
import { ModuleResInterface } from './interfaces'

function App() {
  const [modules, setModules] = useState<ModuleResInterface[]>([])

  useEffect(() => {
    let URL: string = 'https://api.climateclock.world/v1/clock'
    let ERROR_MSG: string = 'Error message'
    const getData = async (url: string, error: string) => {
      let res = await get(url, error)
      let content: ModuleResInterface[] = Object.values(
        res['data']['data']['modules'],
      )
      setModules(content)
    }

    getData(URL, ERROR_MSG)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-rheader"></header>
        {
          <Clock
            timestamp={modules && modules[0] && modules[0].timestamp}
          ></Clock>
        }
      </div>
    </ThemeProvider>
  )
}

export default App
