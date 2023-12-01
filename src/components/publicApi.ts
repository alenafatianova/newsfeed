import { SourcesType } from '../features/source/types'
import { NewsResponse } from '../features/articlesList/types'
import { CategoriesType } from '../features/categories/types'
import { RelatedArticlesType } from '../features/relatedNews/types'
import { ArticleItemType } from '../features/articleItem/types'
import { PartnersPostsType } from '@features/partnersArticles/types'

const API_VERSION = 'v3'

export const apiFetchNews = (lang: string): Promise<NewsResponse> => {
  return fetch(`https://frontend.karpovcourses.net/api/${API_VERSION}/${lang}/news`).then((response) => response.json())
}

export const apiFetchTrends = (lang: string): Promise<NewsResponse> => {
  return fetch(`https://frontend.karpovcourses.net/api/${API_VERSION}/${lang}/trends`).then((response) =>
    response.json()
  )
}

export const apiFetchCategory = (lang: string, id: number): Promise<NewsResponse> => {
  return fetch(`https://frontend.karpovcourses.net/api/${API_VERSION}/${lang}/news/${id}`).then((response) =>
    response.json()
  )
}

export const apiFetchCategories = (): Promise<CategoriesType[]> => {
  return fetch('https://frontend.karpovcourses.net/api/${API_VERSION}/categories').then((response) => response.json())
}

export const apiFetchSources = (): Promise<SourcesType[]> => {
  return fetch('https://frontend.karpovcourses.net/api/${API_VERSION}/sources').then((response) => response.json())
}

export const apiFetchRelatedArticles = (id: number): Promise<RelatedArticlesType> => {
  return fetch(`https://frontend.karpovcourses.net/api/${API_VERSION}/news/related/${id}?count=9`).then((response) =>
    response.json()
  )
}

export const apiFetchArticleItem = (id: number): Promise<ArticleItemType> => {
  return fetch(`https://frontend.karpovcourses.net/api/${API_VERSION}/news/full/${id}`).then((response) =>
    response.json()
  )
}

export const apiFetchSortedPartnerArticle = (): Promise<Record<keyof PartnersPostsType, { stringValue: string }>> => {
  return fetch(
    'https://firestore.googleapis.com/v1/projects/karpov-news-1b158/databases/(default)/documents/partners-posts'
  )
    .then((response) => response.json())
    .then(
      ({
        documents,
      }: {
        documents: Array<{ createTime: string; fields: Record<keyof PartnersPostsType, { stringValue: string }> }>
      }) => {
        return documents.sort((a: any, b: any) => {
          return new Date(a.createTime).getTime() - new Date(b.createTime).getTime() < 0 ? 1 : -1
        })[0].fields
      }
    )
}
