import { compressToEncodedURIComponent } from 'lz-string'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UpdateSettings } from '../../routing/UpdateSettings'
import { UpdateURL } from '../../routing/UpdateURL'
import {
  COMPRESSED_KEY,
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from '../../utils/constants'

const LanguageCustomization = () => {
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  useEffect(() => {
    UpdateURL(navigate, setSelectedLanguage, null)
    UpdateSettings(setSelectedLanguage, null)
  }, [navigate, setSelectedLanguage])

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedLanguage !== localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY)) {
      const json = {
        language: selectedLanguage,
        lifelines: localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY),
      }
      const settings_json = JSON.stringify(json)
      const compressed = compressToEncodedURIComponent(settings_json)

      localStorage.setItem(COMPRESSED_KEY, compressed)
      navigate(`${compressed}`)
    }
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, selectedLanguage)
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
