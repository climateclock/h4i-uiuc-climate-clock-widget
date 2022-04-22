import { COMPRESSED_KEY } from '../utils/constants'
export const UpdateURL = (navigate) => {
  navigate(`${localStorage.getItem(COMPRESSED_KEY)}`)
  // let url = window.location.href
  // let split = url.split('/')
  /*if (localStorage.getItem(COMPRESSED_KEY) !== split[split.length - 1]) {  
  }*/
}
