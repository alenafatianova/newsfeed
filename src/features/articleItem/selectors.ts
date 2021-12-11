import { RootState } from '@app/store';
import { ArticleItemAPI } from '@features/articleItem/types';

export const getArticleItem = (state: RootState): ArticleItemAPI | null => state.articleItem.item;

export const getCachedArticleItem =
  (id: number) =>
  (state: RootState): ArticleItemAPI | null => {
    const articleItem = getArticleItem(state);

    if (articleItem) {
      return articleItem;
    }

    const articleInList = [
      state.articlesList.news,
      state.articlesList.trends,
      Object.values(state.categoryArticles).flat(),
      Object.values(state.relatedArticles).flat(),
    ]
      .flat()
      .find((item) => item.id === id);

    if (!articleInList) {
      return null;
    }

    return {
      ...articleInList,
      category: state.categories[articleInList.category_id],
      source: state.sources[articleInList.source_id],
      link: '',
      text: '',
    };
  };
