import Newsfeed from '../components/clock/Newsfeed'
import { getHeadlines } from '../utils/utils'
import Clock from '../components/clock/Clock'
import { useState, useEffect } from 'react'
import { ERROR_MSG, URL, NUM_LIFELINES_DISPLAYED } from '../utils/constants'
import { getData } from '../utils/utils'
import Lifelines from '../components/lifelines/Lifelines'
import { ModuleResInterface, NewsInterface } from '../interfaces/index'
import NavBar from '../components/ui/NavBar'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

export default function Home() {
  const [defaultLanguage, setDefaultLanguage] = useState<string>('eng')
  const [modules, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  const [newsfeedModules, setNewsfeedModules] = useState<NewsInterface[]>([])
  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  const handle = useFullScreenHandle()
  const [showFullscreenButton, setFullscreenButton] = useState(false)

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

  return (
    <>
      {!errorFlag ? (
        <div>
          <FullScreen
            handle={handle}
            onChange={() => setFullscreenButton(!showFullscreenButton)}
          >
            <NavBar
              handle={handle}
              isFullScreen={showFullscreenButton}
            ></NavBar>
            <Clock
              isFullScreen={!showFullscreenButton}
              timestamp={modules && modules[0] && modules[0].timestamp}
              labels={modules && modules[0] && modules[0].labels}
              flavor={modules && modules[0] && modules[0].flavor}
            />
            <Lifelines
              lifeLineData={lifelineModules}
              displayNum={NUM_LIFELINES_DISPLAYED}
            />
            <Newsfeed headline={getHeadlines(newsfeedModules)} />
          </FullScreen>
        </div>
      ) : (
        <h1>{ERROR_MSG}</h1>
      )}
    </>
  )
}
