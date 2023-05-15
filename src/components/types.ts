import { ArticleType } from "features/ArticleItem/types";
import { CategoriesType } from "features/categoryArticles/types";
import { SourcesType } from "features/Source/types";

export type NewsResponse = {
  items: ArticleType[];
  categories: CategoriesType[];
  sources: SourcesType[];
};
