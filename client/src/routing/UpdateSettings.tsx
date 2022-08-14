import { decompressFromEncodedURIComponent } from 'lz-string'

import {
  COMPRESSED_KEY,
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from '../utils/constants'

export const UpdateSettings = (
  selectLanguage,
  setSelectLanguage,
  lifelineModules,
  setLifelineModules,
) => {
  const url = window.location.href
  const url_split = url.split('/')
  const compressed_path = url_split.at(-1)
  console.log(url_split)
  if (!compressed_path || compressed_path.length < 20) {
    return
  }
  localStorage.setItem(COMPRESSED_KEY, compressed_path)
  if (
    localStorage.getItem(COMPRESSED_KEY) &&
    localStorage.getItem(COMPRESSED_KEY) !== ''
  ) {
    const decompressed = JSON.parse(
      decompressFromEncodedURIComponent(localStorage.getItem(COMPRESSED_KEY)),
    )
    console.log(decompressed)
    if (decompressed.language !== selectLanguage && selectLanguage) {
      setSelectLanguage(decompressed.language)
      localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, decompressed.language)
    }
    if (lifelineModules && decompressed.lifelines !== lifelineModules) {
      setLifelineModules(JSON.parse(decompressed.lifelines))
      localStorage.setItem(LIFELINES_LOCAL_STORAGE_KEY, decompressed.lifelines)
    }
  }
}
