import { useState, useEffect } from 'react'
import {
  COMPRESSED_KEY,
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from '../../utils/constants'
import { compressToEncodedURIComponent } from 'lz-string'
import { useNavigate } from 'react-router-dom'
import { UpdateURL } from '../../routing/UpdateURL'
import { UpdateSettings } from '../../routing/UpdateSettings'

const LanguageCustomization = () => {
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  useEffect(() => {
    UpdateURL(navigate, selectedLanguage, null)
    UpdateSettings(selectedLanguage, null)
  }, [navigate, selectedLanguage])

  const formSubmit = (e: any) => {
    e.preventDefault()
    if (selectedLanguage !== localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY)) {
      let json = {
        language: selectedLanguage,
        lifelines: localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY),
      }
      console.log('inside')
      const settings_json = JSON.stringify(json)
      let compressed = compressToEncodedURIComponent(settings_json)

      localStorage.setItem(COMPRESSED_KEY, compressed)
      navigate(`${compressed}`)
    }
    console.log('here2')
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
