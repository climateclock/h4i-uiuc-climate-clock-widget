import { useEffect,useState } from 'react'

import Clock from '../components/clock/Clock'
import Newsfeed from '../components/clock/Newsfeed'
import Lifelines from '../components/lifelines/Lifelines'
import { ModuleResInterface, NewsInterface } from '../interfaces/index'
import { ERROR_MSG, NUM_LIFELINES_DISPLAYED,URL } from '../utils/constants'
import { getData,getHeadlines  } from '../utils/utils'

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

  return (
    <>
      {!errorFlag ? (
        <div>
          <Clock
            timestamp={modules && modules[0] && modules[0].timestamp}
            labels={modules && modules[0] && modules[0].labels}
            flavor={modules && modules[0] && modules[0].flavor}
          />
          <Lifelines
            lifeLineData={lifelineModules}
            displayNum={NUM_LIFELINES_DISPLAYED}
          />
          <Newsfeed headline={getHeadlines(newsfeedModules)} />
        </div>
      ) : (
        <h1>{ERROR_MSG}</h1>
      )}
    </>
  )
}
