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
 * @param url the endpoint url to GET request to
 * @param type the type of error that is thrown
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

export { get }
