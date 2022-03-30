import { NewsInterface } from '../../interfaces/index'

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
  newsfeedModules.map((module) => (concatenatedHeadlines += module['headline']))
  return concatenatedHeadlines
}

/* reorder
 *
 * Description: Reorder a element at a source index to the postion of destination
 *          index
 */
export const reorderElement = (
  list: Array<any>,
  sourceIndex: number,
  destinationIndex: number,
) => {
  let item = list[sourceIndex]
  list.splice(sourceIndex, 1)
  list.splice(destinationIndex, 0, item)
  return list
}

/* delete
 *
 * Description: Delete a element at an index
 */
export const deleteElement = (list: Array<any>, index: number) => {
  list.splice(index, 1)
  return list
}
