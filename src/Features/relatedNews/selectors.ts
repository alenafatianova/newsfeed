import { RootState } from "@components/store";
import { ArticleType } from "features/ArticleItem/types";


export const getRelatedArticles =
  (articleId: number) =>
  (state: RootState): ArticleType[] => state.relatedArticles[articleId] || [];
