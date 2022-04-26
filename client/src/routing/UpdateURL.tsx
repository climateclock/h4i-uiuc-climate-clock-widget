import { COMPRESSED_KEY } from '../utils/constants'
export const UpdateURL = (navigate) => {
  navigate(`${localStorage.getItem(COMPRESSED_KEY)}`)
}
