import { createContext } from 'react'
import { ThemeContextInterface } from '../interfaces'

/* context for the entirety of the application */
export const ThemeContext = createContext<ThemeContextInterface>({})
