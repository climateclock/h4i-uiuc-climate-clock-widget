import { WindowSize } from '@reach/window-size'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ModuleResInterface, NewsInterface } from '../../interfaces/index'
import { ERROR_MSG, NUM_LIFELINES_DISPLAYED, URL } from '../../utils/constants'
import { getData, getHeadlines } from '../../utils/utils'
import GlobalStyle from '../ui/GlobalStyle'
import Clock from './ClockEmbed'
import Lifelines from './LifelinesEmbed'
import Newsfeed from './NewsfeedEmbed'

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
