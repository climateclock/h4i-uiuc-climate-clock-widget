import { useState, useEffect } from 'react'
import {
  COMPRESSED_KEY,
  LANGUAGE_LOCAL_STORAGE_KEY,
} from '../../utils/constants'
import {
  decompressFromEncodedURIComponent,
  compressToEncodedURIComponent,
} from 'lz-string'
import { useNavigate } from 'react-router-dom'
import { UpdateURL } from '../../routing/UpdateURL'

const LanguageCustomization = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  useEffect(() => UpdateURL(), [selectedLanguage])
  const navigate = useNavigate()
  // let decompressed = JSON.parse(decompressFromEncodedURIComponent(compressed))
  const formSubmit = (e: any) => {
    e.preventDefault()
    if (selectedLanguage !== localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY)) {
      const settings_json = JSON.stringify(selectedLanguage)
      let compressed = compressToEncodedURIComponent(settings_json)
      navigate(`${compressed}`)
      localStorage.setItem(COMPRESSED_KEY, compressed)
    }
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, selectedLanguage)

    console.log(localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY))
  }

  return (
    <>
      <form onSubmit={formSubmit}>
        <label>Language:</label>
        <br />
        <select onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="eng">English</option>
          <option value="spa">Spanish</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default LanguageCustomization
