import { useState, useContext } from 'react'
import { LanguageContext } from '../contexts'

const LanguageCustomization = () => {
  const { setDefaultLanguage } = useContext(LanguageContext)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  const formSubmit = (e: any) => {
    e.preventDefault()
    if (setDefaultLanguage) {
      setDefaultLanguage(selectedLanguage)
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
