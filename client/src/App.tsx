import { Example } from './components/example/Example'
import Lifeline from './components/Lifeline'
import Newsfeed from './components/Newsfeed'
import { ArticleInterface, ModuleResInterface } from './interfaces'
import { useState, useEffect } from 'react'
import { get } from './api/config'
// import { Example } from '../src/components/example/Example'

function App() {
  const [modules, setModules] = useState([])

  useEffect(() => {
    let URL: string = 'https://api.climateclock.world/v1/clock'
    let ERROR_MSG: string = 'Error message'
    const getData = async (url: string, error: string) => {
      let res = await get(url, error)
      let content: ModuleResInterface[] = Object.entries(
        res['data']['data']['modules'],
      ).map(([_, modInfo]) => {
        let q: ModuleResInterface = modInfo
        console.log(q)
        return modInfo
      })
      // console.log(content[0]['description'])
      console.log(content)
      // for (const module, i in Object.entries(res['data']['data']['modules'])) {
      //   console.log(module)
      // }
      // setModules(res['data']['data']['modules'])
      // setModules(content)
    }

    getData(URL, ERROR_MSG)
  }, [])
  // let articles: ArticleInterface[] = [
  //   {
  //     headline: 'US EPA will regulate methane for the first time',
  //   },
  //   {
  //     headline:
  //       'Ghana youth climate defenders present Climate Clock to President Akufo-Addo at COP26',
  //   },
  //   {
  //     headline:
  //       'World leaders at COP26 sign declaration to end deforestation by 2030',
  //   },
  // ]

  return (
    <div className="App">
      <header className="App-header"></header>
      {/* {Object.entries(modules).map(([_, modInfo]) =>
        console.log(modInfo['type']),
      )} */}

      <Lifeline
        title="WORLD'S ENERGY FROM RENEWABLES"
        module_type="LIFELINE"
        value="1,800,800"
        unit="B"
      />
      <Lifeline
        title="WORLD'S ENERGY FROM RENEWABLES"
        module_type="LIFELINE"
        value="1,800,800"
        unit="B"
      />
      {/* <Newsfeed articles={articles} /> */}
      {/* <Example exampleProp="test"></Example> */}
    </div>
  )
}

export default App
