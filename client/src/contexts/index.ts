import { createContext } from 'react'

import { isMobile } from '../hooks/isMobileContext'
import { ThemeContextInterface } from '../interfaces'

/* context for the entirety of the application */
export const ThemeContext = createContext<ThemeContextInterface>({})

export const IsMobileContext = createContext(isMobile() ? true : false)
