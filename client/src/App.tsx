// import { Example } from '../src/components/example/Example'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { WindowSize } from '@reach/window-size'
import LanguageCustomization from './components/LanguageCustomizationForm'
import { LanguageContext } from './contexts'

function App() {
  const [defaultLanguage, setDefaultLanguage] = useState<string>('eng')

  return (
    <ThemeProvider theme={theme}>
      <LanguageContext.Provider value={{ defaultLanguage, setDefaultLanguage }}>
        <div className="App">
          {/*<header className="App-header"></header>*/}
          {/*<Example exampleProp="test"></Example>*/}
          <LanguageCustomization />
        </div>
        <WindowSize>
          {(windowSize) => <GlobalStyle windowSize={windowSize} />}
        </WindowSize>
        <h1>{defaultLanguage}</h1>
      </LanguageContext.Provider>
    </ThemeProvider>
  )
}

export default App
