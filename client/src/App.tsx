import { Example } from './components/example/Example'
import Lifeline from './components/Lifeline'
import Newsfeed from './components/Newsfeed'
import { ArticleInterface } from './interfaces'
// import { Example } from '../src/components/example/Example'

function App() {
  let articles: ArticleInterface[] = [
    {
      headline: 'US EPA will regulate methane for the first time',
    },
    {
      headline:
        'Ghana youth climate defenders present Climate Clock to President Akufo-Addo at COP26',
    },
    {
      headline:
        'World leaders at COP26 sign declaration to end deforestation by 2030',
    },
  ]

  return (
    <div className="App">
      <header className="App-header"></header>
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
      <Newsfeed articles={articles} />
      {/* <Example exampleProp="test"></Example> */}
    </div>
  )
}

export default App
