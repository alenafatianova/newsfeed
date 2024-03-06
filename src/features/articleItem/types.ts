import { SourcesType } from '../source/types'
import { CategoriesType } from '../categories/types'

export type ArticleItemType = {
  id: number
  lang?: string
  date: string
  title: string
  description?: string
  image: ExtendedImageType
  link: string
  text: string
  category: CategoriesType
  source: SourcesType
  author?: string
}

export type ArticleImageType = {
  width: number
  height: number
  type: string
  format: string
  size: number
  url: string
}

export type ExtendedImageType = {
  variants: ArticleImageType[]
  source: string
}

export interface ArticleType {
  id: number
  date: string
  title: string
  description: string
  image: ExtendedImageType
  source_id: number
  category_id: number
}
