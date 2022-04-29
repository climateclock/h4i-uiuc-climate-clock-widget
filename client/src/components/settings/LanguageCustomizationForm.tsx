import { useState } from 'react'

import { LANGUAGE_LOCAL_STORAGE_KEY } from '../../utils/constants'

const LanguageCustomization = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
