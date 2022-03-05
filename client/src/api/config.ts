import axios, { AxiosResponse } from 'axios'
import { ApiRequestUrl } from './constants'

interface ErrorWrapper {
  type: string
  error: any
}

const instance = axios.create({
  baseURL: ApiRequestUrl.BASE,
})

/**
 * General GET request
 *
 * @param url -- the endpoint url to GET request to
 * @param language -- the language to attain from the API
 * @returns API endpoint response object
 */
const get = async <T>(
  url: string,
  type: string,
): Promise<AxiosResponse<T> | ErrorWrapper> =>
  await instance.get(url).catch((error) => ({
    type: type,
    error,
  }))

/*
const getByLanguage = (url: string, language: string): string => {
  const languageAPIFormat = `?lang=${language}`
  if (url.charAt(url.length - 1) == '/')
    return url.slice(0, url.length - 1) + languageAPIFormat
  return url + languageAPIFormat

  await instance.get(url).catch((error) => ({
    type: type,
    error,
  }))
}
*/
export { get }
