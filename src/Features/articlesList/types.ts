import { SourcesType } from 'features/source/types';
import { ArticleType } from '../articleItem/types';
import { CategoriesType } from 'features/categories/types';

export type NewsResponse = {
  items: ArticleType[];
  categories: CategoriesType[];
  sources: SourcesType[];
};
