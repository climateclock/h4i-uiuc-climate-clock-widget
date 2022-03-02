// import { Example } from '../src/components/example/Example'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { WindowSize } from '@reach/window-size'
import LanguageCustomization from './components/LanguageCustomizationForm'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/*<header className="App-header"></header>*/}
        {/*<Example exampleProp="test"></Example>*/}
        <LanguageCustomization />
      </div>
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </ThemeProvider>
  )
}

export default App
