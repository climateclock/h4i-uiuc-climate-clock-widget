// import { Example } from '../src/components/example/Example'
import { createContext } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { WindowSize } from '@reach/window-size'
import LanguageCustomization from './components/LanguageCustomizationForm'

function App() {
  const defaultLanguage = 'eng'
  const LanguageContext = createContext(defaultLanguage)

  return (
    <ThemeProvider theme={theme}>
      <LanguageContext.Provider value={defaultLanguage}>
        <div className="App">
          {/*<header className="App-header"></header>*/}
          {/*<Example exampleProp="test"></Example>*/}
          <LanguageCustomization />
        </div>
        <WindowSize>
          {(windowSize) => <GlobalStyle windowSize={windowSize} />}
        </WindowSize>
      </LanguageContext.Provider>
    </ThemeProvider>
  )
}

export default App
