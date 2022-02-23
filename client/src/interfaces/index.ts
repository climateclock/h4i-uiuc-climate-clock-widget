export interface ArticleInterface {
  date?: Date | string
  headline?: string
  headline_original?: string
  source?: string
  link?: string
  summary?: string
}

export interface LifelinePropsInterface {
  title: string
  module_type: string
  value: number | undefined
  unit: string
  rate?: number
}

export interface NewsfeedPropsInterface {
  articles: ArticleInterface[]
}

export class ModuleResInterface {
  description?: string
  flavor?: string
  growth?: string
  initial?: number
  labels?: string[] | undefined
  lang?: string
  rate?: number
  resolution?: number
  timestamp?: string // double check
  type?: string
  unit_labels?: string[]
  update_interval_seconds?: number
}
