import { createContext } from 'react'

interface LanguageContextInterface {
  defaultLanguage?: string
  setDefaultLanguage?: React.Dispatch<React.SetStateAction<string>>
}

export const LanguageContext = createContext<LanguageContextInterface>({})
