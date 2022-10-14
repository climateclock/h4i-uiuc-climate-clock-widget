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

  function MouseTrack(): boolean {
    const [y, setY] = useState()
    useEffect(() => {
      const update = (e) => {
        setY(e.y)
      }
      window.addEventListener('mousemove', update)
      window.addEventListener('touchmove', update)
      return () => {
        window.removeEventListener('mousemove', update)
        window.removeEventListener('touchmove', update)
      }
    })
    return y && y <= 100 ? true : false
  }

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
              atHome={true}
              hideNavBar={MouseTrack()}
            ></NavBar>
            <Clock
              navBarHidden={!MouseTrack() && !showFullscreenButton}
              isFullScreen={!showFullscreenButton}
              timestamp={modules && modules[0] && modules[0].timestamp}
              labels={modules && modules[0] && modules[0].labels}
              flavor={modules && modules[0] && modules[0].flavor}
              numLifelines={lifelineModules.length}
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
