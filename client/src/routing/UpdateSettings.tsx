import { decompressFromEncodedURIComponent } from 'lz-string'
import {
  COMPRESSED_KEY,
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from '../utils/constants'

export const UpdateSettings = (selectLanguage, lifelineModules) => {
  let url = window.location.href
  let url_split = url.split('/')
  let compressed_path = url_split[url_split.length - 1]
  console.log(url_split)
  console.log(compressed_path)
  if (compressed_path.length < 20) {
    return
  }
  localStorage.setItem(COMPRESSED_KEY, compressed_path)
  if (
    localStorage.getItem(COMPRESSED_KEY) !== null &&
    localStorage.getItem(COMPRESSED_KEY) !== ''
  ) {
    let decompressed = JSON.parse(
      decompressFromEncodedURIComponent(localStorage.getItem(COMPRESSED_KEY)),
    )
    console.log(decompressed)
    if (decompressed.language !== selectLanguage) {
      selectLanguage(decompressed.language)
      localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, decompressed.language)
    }
    if (lifelineModules != null && decompressed.lifelines !== lifelineModules) {
      console.log(JSON.stringify(decompressed.lifelines))
      lifelineModules(decompressed.lifelines)
      localStorage.setItem(
        LIFELINES_LOCAL_STORAGE_KEY,
        JSON.stringify(decompressed.lifelines),
      )
    }
  }
}
