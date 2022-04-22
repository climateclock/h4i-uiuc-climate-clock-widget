import { decompressFromEncodedURIComponent } from 'lz-string'
import { COMPRESSED_KEY } from '../utils/constants'
export const UpdateSettings = (selectLanguage, lifelineModules) => {
  let decompressed = JSON.parse(
    decompressFromEncodedURIComponent(localStorage.getItem(COMPRESSED_KEY)),
  )
  if (decompressed.language !== selectLanguage) {
    selectLanguage = decompressed.language
  }
  if (lifelineModules != null && decompressed.lifelines !== lifelineModules) {
    lifelineModules = decompressed.lifelines
  }
}
