import { useState, useContext } from 'react'
import { ThemeContext } from '../contexts'
import { LANGUAGE_LOCAL_STORAGE_KEY } from '../util/constants'

const LanguageCustomization = () => {
  const { setDefaultLanguage } = useContext(ThemeContext)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  const formSubmit = (e: any) => {
    e.preventDefault()
    if (setDefaultLanguage) {
      localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, selectedLanguage)
    }
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
