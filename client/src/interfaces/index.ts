export interface NewsInterface {
  data?: string
  headline?: string
  headline_original?: string
  link?: string
  source?: string
  summary?: string
}

/* Interface for ThemeContext in App.tsx */
export interface ThemeContextInterface {
  defaultLanguage?: string
  setDefaultLanguage?: React.Dispatch<React.SetStateAction<string>>
  lifelineModules?: ModuleResInterface[]
  setLifelineModules?: React.Dispatch<
    React.SetStateAction<ModuleResInterface[]>
  >
}

/* Interface for props for Lifeline component in Lifeline.tsx */
export interface LifelinePropsInterface {
  title: string
  module_type: string
  value: number | undefined
  unit: string
  rate?: number
  resolution?: number
}

/* Properties optional since some may not be
 * returned from the API
 */
export class ModuleResInterface {
  description?: string
  flavor?: string
  growth?: string
  initial?: number
  labels?: string[] | undefined
  lang?: string
  rate?: number
  resolution?: number
  timestamp?: string
  type?: string
  unit_labels?: string[]
  update_interval_seconds?: number
  customizable?: boolean
  isFullScreen?: boolean
}

/* Properties for options within
 * StyledSelect component in DefaultLifelineCreationForm
 */
export interface OptionsInterface {
  value: ModuleResInterface
  label: string
}
