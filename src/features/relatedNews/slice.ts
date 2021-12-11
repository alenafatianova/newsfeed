import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '@features/articleItem/types';

type InitialState = Record<number, Article[]>;

const initialState: InitialState = {};

export const relatedArticlesSlice = createSlice({
  name: 'relatedArticles',
  initialState,
  reducers: {
    setRelatedArticles: (state, action: PayloadAction<{ id: number; articles: Article[] }>) => {
      const id = action.payload.id;
      const articles = action.payload.articles;

      if (state[id]) {
        state[id].push(...articles);
      } else {
        state[id] = [];
        state[id].push(...articles);
      }
    },
  },
});

export const { setRelatedArticles } = relatedArticlesSlice.actions;

export default relatedArticlesSlice.reducer;
