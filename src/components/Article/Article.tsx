import React, { useEffect, useState } from 'react';
import './Article.css';
import { SingleLineTitleArticle } from '../SingleLineTitleArticle/SingleLineTitleArticle';
import { ArticleItem, Categories, Items, RelatedArticleItem, Sources } from '../../types';
import { useParams } from 'react-router-dom';
import { ArticleItemInfo } from '../ArticleItemInfo/ArticleItemInfo';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';

export const Article: React.FC = () => {
  const { id }: { id?: number } = useParams();
  const [articleItem, setArticleItem] = useState<ArticleItem | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Items[] | null>(null);
  const [categories, setCategories] = useState<Categories[] | null>([]);
  const [sources, setSources] = useState<Sources[] | null>([]);

  useEffect(() => {
    fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`)
      .then((response) => response.json())
      .then(setArticleItem);

    Promise.all([
      fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`).then((response) => response.json()),
      fetch(`https://frontend.karpovcourses.net/api/v2/categories`).then((response) => response.json()),
      fetch(`https://frontend.karpovcourses.net/api/v2/sources`).then((response) => response.json()),
    ]).then((response) => {
      const articles: RelatedArticleItem = response[0];
      setRelatedArticles(articles.items);

      const categories = response[1];
      setCategories(categories);

      const sources = response[2];
      setSources(sources);
    });
  }, [id]);

  if (articleItem === null || relatedArticles === null) {
    return null;
  }

  const renderArticleItemInfo = (articleItem: ArticleItem) => {
    return (
      <ArticleItemInfo
        categoryName={articleItem.category.name}
        date={articleItem.date}
        sourceLink={articleItem.source?.site}
        sourceName={articleItem.source.name}
        author={articleItem.author}
      />
    );
  };

  return (
    <section className="article-page">
      <article className="article">
        <Hero title={articleItem.title} image={articleItem.image} className="article-page__hero" />

        <div className="grid container article__main">
          <div className="article__content">
            {renderArticleItemInfo(articleItem)}

            <p>{articleItem?.text}</p>
            <img src={articleItem?.image} />
          </div>

          <div className="sidebar__article">
            {relatedArticles.slice(3, 9).map((item) => {
              const source = sources?.find(({ id }) => item.source_id === id);
              return (
                <SidebarArticleCard
                  className="sidebar__article-item"
                  date={item.date}
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  source={source?.name || ''}
                  image={item.image}
                />
              );
            })}
          </div>
        </div>
      </article>

      <section className="article-page__related-articles">
        <div className="container">
          <h2 className="article-page__related-articles-title">{articleItem?.title}</h2>

          <div className="grid article-page__related-articles-list">
            {relatedArticles?.slice(0, 3).map((article) => {
              const category = categories?.find(({ id }) => article?.category_id === id);
              const source = sources?.find(({ id }) => article?.source_id === id);
              return (
                <SingleLineTitleArticle
                  key={article.id}
                  image={article.image}
                  source={source?.name || ''}
                  category={category?.name || ''}
                  text={article.description}
                  title={article.title}
                  id={article.id}
                />
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
