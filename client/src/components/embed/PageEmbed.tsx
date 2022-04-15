// import Newsfeed from '../../components/clock/Newsfeed'
import Newsfeed from './NewsfeedEmbed'
import { getHeadlines } from '../../utils/utils'
// import Clock from '../../components/clock/Clock'
import Clock from './ClockEmbed'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ERROR_MSG, URL, NUM_LIFELINES_DISPLAYED } from '../../utils/constants'
import { getData } from '../../utils/utils'
import Lifelines from './LifelinesEmbed'
import { ModuleResInterface, NewsInterface } from '../../interfaces/index'

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
    @media screen and (max-height: 400px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  `

  const PageEmbedContainer = styled.div`
    @media screen and (max-height: 400px) {
      display: flex;
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
            <Lifelines lifeLineData={lifelineModules} displayNum={1} />
          </PageEmbedContainer>
          <Newsfeed headline={getHeadlines(newsfeedModules)} />
        </Container>
      ) : (
        <h1>{ERROR_MSG}</h1>
      )}
    </>
  )
}
