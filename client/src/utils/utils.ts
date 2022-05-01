import { AxiosResponse } from 'axios'

import { ErrorWrapper, get } from '../api/config'
import { ModuleResInterface, NewsInterface } from '../interfaces/index'
import {
  DEFAULT_LIFELINES_LOCAL_STORAGE_KEY,
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from './constants'

/* data fetching functions */
export const fetchData = async <T>(
  url: string,
  error: string,
): Promise<AxiosResponse<T> | ErrorWrapper> => {
  return await get(url, error)
}

export const getModules = async <T>(
  url: string,
  error: string,
  setModules: React.Dispatch<React.SetStateAction<ModuleResInterface[]>>,
  setErrorFlag: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const res: AxiosResponse<T> | ErrorWrapper = await fetchData(url, error)
  setErrorFlag('error' in res)

  if (!('error' in res)) {
    /* set modules */
    const resModules: ModuleResInterface[] = Object.values(
      res['data']['data']['modules'],
    )
    setModules(resModules)
  } else {
    setModules([])
  }

  return res
}

export const getNewsfeedModules = async <T>(
  url: string,
  error: string,
  setNewsfeedModules: React.Dispatch<React.SetStateAction<NewsInterface[]>>,
  setErrorFlag: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const res: AxiosResponse<T> | ErrorWrapper = await fetchData(url, error)
  setErrorFlag('error' in res)

  if (!('error' in res)) {
    /* set newsfeed modules */
    const resNewsfeedModules: NewsInterface[] = Object.values(
      res['data']['data']['modules']['newsfeed_1']['newsfeed'],
    )
    setNewsfeedModules(resNewsfeedModules)
  } else {
    setNewsfeedModules([])
  }
}

export const getLifelineModules = async <T>(
  url: string,
  error: string,
  setLifelineModules: React.Dispatch<
    React.SetStateAction<ModuleResInterface[]>
  >,
  setErrorFlag?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const res: AxiosResponse<T> | ErrorWrapper = await fetchData(url, error)
  if (setErrorFlag) setErrorFlag('error' in res)

  if (!('error' in res)) {
    /* set modules */
    const resModules: ModuleResInterface[] = Object.values(
      res['data']['data']['modules'],
    )

    /* set lifelines */
    if (!localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY)) {
      const resLifelineModules = resModules.filter((module) => {
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
      localStorage.setItem(
        DEFAULT_LIFELINES_LOCAL_STORAGE_KEY,
        JSON.stringify(resLifelineModules),
      )
    } else {
      const curLifelineModules = localStorage.getItem(
        LIFELINES_LOCAL_STORAGE_KEY,
      )
      if (curLifelineModules) setLifelineModules(JSON.parse(curLifelineModules))
    }
  } else {
    setLifelineModules([])
  }
}

export const getDefaultLanguage = (
  setDefaultLanguage: React.Dispatch<React.SetStateAction<string>>,
) => {
  const defaultLanguage: string | null = localStorage.getItem(
    LANGUAGE_LOCAL_STORAGE_KEY,
  )
  if (defaultLanguage) setDefaultLanguage(defaultLanguage)
  else {
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, 'eng')
    setDefaultLanguage('eng')
  }
}

/* data setting functions */
export const setLifelines = async <T>(
  res: AxiosResponse<T> | ErrorWrapper,
  setLifelineModules: React.Dispatch<
    React.SetStateAction<ModuleResInterface[]>
  >,
) => {
  /* set modules */
  const resModules: ModuleResInterface[] = Object.values(
    res['data']['data']['modules'],
  )

  /* set lifelines */
  if (
    !localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY) ||
    !localStorage.getItem(DEFAULT_LIFELINES_LOCAL_STORAGE_KEY)
  ) {
    const resLifelineModules = resModules.filter((module) => {
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
    localStorage.setItem(
      DEFAULT_LIFELINES_LOCAL_STORAGE_KEY,
      JSON.stringify(resLifelineModules),
    )
  } else {
    const curLifelineModules = localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY)
    if (curLifelineModules) setLifelineModules(JSON.parse(curLifelineModules))
  }
}

export const setNewsfeeds = async <T>(
  res: AxiosResponse<T> | ErrorWrapper,
  setNewsfeedModules: React.Dispatch<React.SetStateAction<NewsInterface[]>>,
) => {
  /* set newsfeed modules */
  const resNewsfeedModules: NewsInterface[] = Object.values(
    res['data']['data']['modules']['newsfeed_1']['newsfeed'],
  )
  setNewsfeedModules(resNewsfeedModules)
}

/* get all data  */
export const getData = async <T>(
  url: string,
  error: string,
  setErrorFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setDefaultLanguage: React.Dispatch<React.SetStateAction<string>>,
  setModules: React.Dispatch<React.SetStateAction<ModuleResInterface[]>>,
  setLifelineModules: React.Dispatch<
    React.SetStateAction<ModuleResInterface[]>
  >,
  setNewsfeedModules?: React.Dispatch<React.SetStateAction<NewsInterface[]>>,
) => {
  /* set modules */
  const res: AxiosResponse<T> | ErrorWrapper = await getModules(
    url,
    error,
    setModules,
    setErrorFlag,
  )

  /* errorWrapper returned in res */
  if ('error' in res) {
    setErrorFlag(true)
    setModules([])
    setLifelineModules([])
    if (setNewsfeedModules) setNewsfeedModules([])
    return
  }

  /* set newsfeed modules */
  if (setNewsfeedModules) setNewsfeeds(res, setNewsfeedModules)

  /* set lifelines */
  setLifelines(res, setLifelineModules)

  /* set default language */
  getDefaultLanguage(setDefaultLanguage)
}

/* returnFirstString
 *
 * Description: Used to return first element in an array
 *                ie. API returns unit_labels as an array so we need to return first element if unit_labels
 *                    sent in API response, else return empty string
 */
export const returnFirstString = (array: string[] | undefined) => {
  if (array === undefined || !array.length) {
    return ''
  }
  return array[0]
}

/* toUpperCase
 *
 * Description: Used to capitalize element if not undefined, else return empty string
 *                ie. API returns flavor which needs to be captialized if unit_labels
 *                    sent in API response, else return empty string
 */
export const toUpperCase = (str: string | undefined) => {
  if (str === undefined) {
    return ''
  }
  return str.toUpperCase()
}

/* concatHeadline
 *
 * Description: Used to concatenate all nested headlines within the newsfeed_1 object
 *         array into a string, returns the string
 */
export const getHeadlines = (newsfeedModules: NewsInterface[]) => {
  let concatenatedHeadlines = ''
  newsfeedModules.map(
    (module) => (concatenatedHeadlines += ' | ' + module['headline']),
  )
  return concatenatedHeadlines
}

/* reorder
 *
 * Description: Reorder a element at a source index to the postion of destination
 *          index
 */
export const reorderElement = (
  list: Array<unknown>,
  sourceIndex: number,
  destinationIndex: number,
) => {
  const item = list[sourceIndex]
  list.splice(sourceIndex, 1)
  list.splice(destinationIndex, 0, item)
  return list
}

/* delete
 *
 * Description: Delete a element at an index
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteElement = (list: Array<any>, index: number) => {
  list.splice(index, 1)
  return list
}
