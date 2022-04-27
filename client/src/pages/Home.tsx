import Newsfeed from '../components/clock/Newsfeed'
import { getHeadlines } from '../utils/utils'
import Clock from '../components/clock/Clock'
import { useState, useEffect } from 'react'
import {
  ERROR_MSG,
  URL,
  NUM_LIFELINES_DISPLAYED,
  LIFELINES_LOCAL_STORAGE_KEY,
  LANGUAGE_LOCAL_STORAGE_KEY,
} from '../utils/constants'
import { getData } from '../utils/utils'
import Lifelines from '../components/lifelines/Lifelines'
import { ModuleResInterface, NewsInterface } from '../interfaces/index'
import { UpdateURL } from '../routing/UpdateURL'
import { UpdateSettings } from '../routing/UpdateSettings'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const [defaultLanguage, setDefaultLanguage] = useState<string>('eng')
  const [modules, setModules] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  const [newsfeedModules, setNewsfeedModules] = useState<NewsInterface[]>([])
  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  const navigate = useNavigate()
  //localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY),localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY)
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
    UpdateURL(navigate, defaultLanguage, lifelineModules)
    UpdateSettings(defaultLanguage, lifelineModules)
  }, [navigate, defaultLanguage, lifelineModules])

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
