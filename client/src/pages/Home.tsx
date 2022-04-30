import { useEffect, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import Clock from '../components/clock/Clock'
import Newsfeed from '../components/clock/Newsfeed'
import Lifelines from '../components/lifelines/Lifelines'
import NavBar from '../components/ui/NavBar'
import { ModuleResInterface, NewsInterface } from '../interfaces/index'
import { ERROR_MSG, NUM_LIFELINES_DISPLAYED, URL } from '../utils/constants'
import { getData, getHeadlines } from '../utils/utils'

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
            <NavBar handle={handle} isFullScreen={showFullscreenButton} />
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
