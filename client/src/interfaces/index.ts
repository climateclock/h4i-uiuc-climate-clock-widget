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
  value: string
  unit: string
}

export interface NewsfeedPropsInterface {
  articles: ArticleInterface[]
}
