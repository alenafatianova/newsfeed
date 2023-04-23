import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewsResponse } from '../../types';
import { categoryIds, categoryNames } from '../../utils';
import { PartnersArticles } from '../PartnersArticles/PartnersArticles';

import './Articles.css';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';

export const Articles: React.FC = () => {
  const { categoryID = 'index' }: { categoryID?: string } = useParams();
  const [articles, setArticles] = useState<NewsResponse>({ items: [], categories: [], sources: [] });

  useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[categoryID] || '')
      .then((response) => response.json())
      .then((response: NewsResponse) => {
        setArticles(response);
      });
  }, [categoryID]);

  return (
    <section className="articles">
      <Hero title={categoryNames[categoryID]} image="test" className="articles__hero" />
      <div className="container grid">
        <section className="articles__content">
          {articles.items.slice(0, 3).map((item) => {
            const category = articles?.categories?.find(({ id }) => item?.category_id === id);
            const source = articles.sources.find(({ id }) => item.source_id === id);
            return (
              <ArticleCard
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={category?.name}
                source={source?.name}
                id={item.id}
              />
            );
          })}
        </section>
        <section className="articles__sidebar">
          {articles.items.slice(3, 12).map((item) => {
            const source = articles.sources.find(({ id }) => item.source_id === id);
            return (
              <SidebarArticleCard
                className="articles__sidebar-item"
                key={item.id}
                id={item.id}
                title={item.title}
                source={source?.name || ''}
                image={item.image}
                date={item.date}
              />
            );
          })}
        </section>
      </div>

      <div className="partners-article">
        <div>
          <PartnersArticles />
        </div>
      </div>
    </section>
  );
};
