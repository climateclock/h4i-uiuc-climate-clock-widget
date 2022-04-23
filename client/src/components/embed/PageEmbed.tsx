import { WindowSize } from '@reach/window-size'
import Newsfeed from './NewsfeedEmbed'
import { getHeadlines } from '../../utils/utils'
import Clock from './ClockEmbed'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ERROR_MSG, URL, NUM_LIFELINES_DISPLAYED } from '../../utils/constants'
import { getData } from '../../utils/utils'
import Lifelines from './LifelinesEmbed'
import { ModuleResInterface, NewsInterface } from '../../interfaces/index'
import GlobalStyle from '../ui/GlobalStyle'

export default function Home() {
  const [defaultLanguage, setDefaultLanguage] = useState<string>('eng')
  const [modules, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  const [newsfeedModules, setNewsfeedModules] = useState<NewsInterface[]>([])
  const [errorFlag, setErrorFlag] = useState<boolean>(false)

  useEffect(() => {
    getData(
      URL,
      ERROR_MSG,
      setErrorFlag,
      setDefaultLanguage,
      setModules,
      setLifelineModules,
      setNewsfeedModules,
    )
  }, [defaultLanguage])

  const Container = styled.div`
    @media screen and (min-width: 1025px) {
      height: 112px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @media screen and (max-width: 1024px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  `

  const PageEmbedContainer = styled.div`
    @media screen and (min-width: 1025px) {
      height: 85%;
      display: flex;
    }

    // code for stacking
    @media only screen and (max-width: 1024px) {
      height: 85%;
      display: flex;

      flex-direction: column;
    }
  `

  return (
    <>
      {!errorFlag ? (
        <Container>
          <PageEmbedContainer>
            <Clock
              timestamp={modules && modules[0] && modules[0].timestamp}
              labels={modules && modules[0] && modules[0].labels}
              flavor={modules && modules[0] && modules[0].flavor}
            />
            <Lifelines
              lifeLineData={lifelineModules}
              displayNum={NUM_LIFELINES_DISPLAYED}
            />
          </PageEmbedContainer>
          <Newsfeed headline={getHeadlines(newsfeedModules)} />
        </Container>
      ) : (
        <h1>{ERROR_MSG}</h1>
      )}
      <WindowSize>
        {(windowSize) => <GlobalStyle windowSize={windowSize} />}
      </WindowSize>
    </>
  )
}
