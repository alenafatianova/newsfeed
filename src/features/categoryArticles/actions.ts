import { apiFetchCategory } from '@components/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setCategoryArticles } from './slice'

export const fetchCategoryArticles = createAsyncThunk('api/fetchCategoryArticles', (categoryId: number, thunk) => {
  return apiFetchCategory(categoryId).then((news) => {
    thunk.dispatch(setCategoryArticles({ id: categoryId, articles: news.items }))
  })
})
