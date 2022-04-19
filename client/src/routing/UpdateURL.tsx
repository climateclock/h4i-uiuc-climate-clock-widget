import { useNavigate } from 'react-router-dom'
import {
  COMPRESSED_KEY,
} from '../utils/constants'
export const UpdateURL = () => {
  const navigate = useNavigate()
  navigate(`${localStorage.getItem(COMPRESSED_KEY)}`)
  let url = window.location.href
  let split = url.split("/")
  if (localStorage.getItem(COMPRESSED_KEY) !== split[split.length - 1]) {
      
  }
}
