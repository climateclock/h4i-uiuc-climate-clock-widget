import Lifeline from './components/Lifeline'
import Newsfeed from './components/Newsfeed'
import { ArticleInterface, ModuleResInterface } from './interfaces'
import { useState, useEffect } from 'react'
import { get } from './api/config'
import React from 'react'
import { Example } from '../src/components/example/Example'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'

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

  const returnFirstString = (array: string[] | undefined) => {
    if (array === undefined || !array.length) {
      return ''
    }
    return array[0]
  }

  const toUpperCase = (str: string | undefined) => {
    if (str === undefined) {
      return ''
    }
    return str.toUpperCase()
  }

  return (
    <ThemeProvider theme={theme}>
      {console.log(modules)}
      <div className="App">
        <header className="App-header"></header>
        {modules.map(
          (module) =>
            module['type'] !== 'newsfeed' && (
              <Lifeline
                key={module['description']}
                title={returnFirstString(module['labels'])}
                module_type={toUpperCase(module['flavor'])}
                value={module['initial']}
                unit={returnFirstString(module['unit_labels'])}
              />
            ),
        )}
        {/* <Example exampleProp="test"></Example> */}
        {/* <Newsfeed articles={articles} /> */}
      </div>
    </ThemeProvider>
  )
}

export default App
