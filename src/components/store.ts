import { PayloadAction, configureStore, ThunkDispatch, ThunkAction } from '@reduxjs/toolkit'
import { articlesItemReducer } from 'features/ArticleItem/slice'
import { sourcesReducer } from '../features/Source/slice'
import { relatedArticlesReducer } from 'features/relatedNews/slice'
import { categoryArticlesReducer } from 'features/categoryArticles/slice'
import { categoriesReducer } from 'features/categories/slice'

export const store = configureStore({
  reducer: {
    articlesList: articlesReducer,
    categoryArticles: categoryArticlesReducer,
    categoriesList: categoriesReducer,
    relatedArticles: relatedArticlesReducer,
    articleItem: articlesItemReducer,
    sources: sourcesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = ThunkDispatch<RootState, unknown, PayloadAction>
export type AppAction<T> = ThunkAction<T, RootState, unknown, PayloadAction> 