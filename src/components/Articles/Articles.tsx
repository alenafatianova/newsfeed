import React from 'react';
import { NewsResponse } from '../../types';
import { MainArticle } from '../MainArticle/MainArticle';
import { SmallArticle } from '../SmallArticle/SmallArticle';
import './Articles.css';

interface ArticlesType {
  articles: NewsResponse;
}

export const Articles: React.FC<ArticlesType> = ({ articles }) => {
  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {articles.items.slice(0, 3).map((item) => {
            const category = articles?.categories?.find(({ id }) => item?.category_id === id);
            const source = articles.sources.find(({ id }) => item.source_id === id);
            return (
              <MainArticle
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={category?.name || ''}
                source={source?.name || ''}
                id={item.id}
              />
            );
          })}
        </section>
        <section className="articles__small-column">
          {articles.items.slice(3, 12).map((item) => {
            const source = articles.sources.find(({ id }) => item.source_id === id);
            return (
              <SmallArticle
                key={item.title}
                title={item.title}
                source={source?.name}
                date={item.date}
                id={item.id}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};
