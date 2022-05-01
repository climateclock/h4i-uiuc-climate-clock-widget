import { get } from '../api/config'
import { ModuleResInterface, NewsInterface } from '../interfaces/index'
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
  setNewsfeedModules?: React.Dispatch<React.SetStateAction<NewsInterface[]>>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: any = await get(url, error)

  /* errorWrapper returned in res */
  if ('error' in res) {
    setErrorFlag(true)
    setModules([])
    setLifelineModules([])
    if (setNewsfeedModules) setNewsfeedModules([])
    return
  }

  /* set modules */
  const resModules: ModuleResInterface[] = Object.values(
    res['data']['data']['modules'],
  )
  setModules(resModules)

  /* set newsfeed modules */
  if (setNewsfeedModules) {
    const resNewsfeedModules: NewsInterface[] = Object.values(
      res['data']['data']['modules']['newsfeed_1']['newsfeed'],
    )
    setNewsfeedModules(resNewsfeedModules)
  }

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
