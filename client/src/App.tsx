import { Example } from '../src/components/example/Example'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from './components/ui/GlobalStyle'
import { WindowSize } from '@reach/window-size'
import Newsfeed from './components/Newsfeed'
import Marquee from 'react-fast-marquee'

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
  const headlines2: string[] = [
    'US EPA will regulate methane for the first time | ',
    'Ghana youth climate defenders present Climate Clock to President Akufo-Addo at COP26 | ',
  ]
  return (
    <>
      <Newsfeed headlines={headlines} />
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header"></header>
          <Example exampleProp="test"></Example>
          {/* <Newsfeed headlines={headlines} /> */}
        </div>
        <WindowSize>
          {(windowSize) => <GlobalStyle windowSize={windowSize} />}
        </WindowSize>
      </ThemeProvider>
    </>
  )
}

export default App
