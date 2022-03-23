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
export const concatHeadline = (newsfeedModules: NewsInterface[]) => {
  let concatenatedHeadlines = ''
  console.log(newsfeedModules)
  newsfeedModules.map((module) => (concatenatedHeadlines += module['headline']))
  return concatenatedHeadlines
}
