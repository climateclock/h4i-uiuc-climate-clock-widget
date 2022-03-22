import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './components/ui/GlobalStyle'
import Clock from './components/clock/Clock'
import Settings from './pages/Settings'
import Lifelines from './pages/Lifelines'
import { get } from './api/config'
import { ModuleResInterface } from './interfaces'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Clock
                timestamp={modules && modules[0] && modules[0].timestamp}
              ></Clock>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/lifelines" element={<Lifelines />} />
        </Routes>
      </Router>
      <div>{}</div>
    </ThemeProvider>
  )
}

export default App
