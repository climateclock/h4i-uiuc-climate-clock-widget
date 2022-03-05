export interface ThemeContextInterface {
  defaultLanguage?: string
  setDefaultLanguage?: React.Dispatch<React.SetStateAction<string>>
}

export interface LifelinePropsInterface {
  title: string
  module_type: string
  value: number | undefined
  unit: string
  rate?: number
  resolution?: number
}

// made properties optional since some properties may be within
// a module returned from the API
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
}
