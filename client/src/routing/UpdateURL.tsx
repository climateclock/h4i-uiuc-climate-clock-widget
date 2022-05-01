import {
  COMPRESSED_KEY,
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from '../utils/constants'
export const UpdateURL = (navigate, language, lifelines) => {
  if (
    language &&
    localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY) !== language &&
    localStorage.getItem(COMPRESSED_KEY) !== null
  ) {
    navigate(`${localStorage.getItem(COMPRESSED_KEY)}`)
  }
  if (
    lifelines &&
    localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY) !== lifelines &&
    localStorage.getItem(COMPRESSED_KEY) !== null
  ) {
    navigate(`${localStorage.getItem(COMPRESSED_KEY)}`)
  }
}
