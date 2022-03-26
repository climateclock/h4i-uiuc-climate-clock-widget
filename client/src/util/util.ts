import { get } from '../api/config'
import { ModuleResInterface } from '../interfaces'
import {
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from './constants'

export const getData = async (
  url: string,
  error: string,
  setErrorFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setDefaultLanguage: React.Dispatch<React.SetStateAction<string>>,
  setModules: React.Dispatch<React.SetStateAction<ModuleResInterface[]>>,
  setLifelineModules: React.Dispatch<
    React.SetStateAction<ModuleResInterface[]>
  >,
) => {
  let res: any = await get(url, error)

  /* errorWrapper returned in res */
  if ('error' in res) {
    setErrorFlag(true)
    setModules([])
    setLifelineModules([])
    return
  }

  let resModules: ModuleResInterface[] = Object.values(
    res['data']['data']['modules'],
  )
  setModules(resModules)

  if (!localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY)) {
    let resLifelineModules = resModules.filter((module) => {
      if (module['type'] === 'value' && module['flavor'] === 'lifeline') {
        return true
      }
      return false
    })
    setLifelineModules(resLifelineModules)

    /* stores lifeline modules in local storage */
    localStorage.setItem(
      LIFELINES_LOCAL_STORAGE_KEY,
      JSON.stringify(resLifelineModules),
    )
  } else {
    const curLifelineModules = localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY)
    if (curLifelineModules) setLifelineModules(JSON.parse(curLifelineModules))
  }

  const defaultLanguage: string | null = localStorage.getItem(
    LANGUAGE_LOCAL_STORAGE_KEY,
  )
  if (defaultLanguage) setDefaultLanguage(defaultLanguage)
  else localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, 'eng')
}
