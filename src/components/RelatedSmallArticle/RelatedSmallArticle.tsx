import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import './RelatedSmallArticle.css';

interface RelatedArticleProp {
  image: string;
  category: string;
  title: string;
  source: string;
  id: number | string
}

export const RelatedSmallArticle: FC<RelatedArticleProp> = ({ image, category, title, source }) => {
  const { id } = useParams()
  return (
   <Link to={`article/${id}`}>
    <article className="related-small-article">
      <img className="related-small-article__image" src={image} />
      <div className="related-small-article__content">
        <span className="article-category related-small-article__category">{category}</span>
        <h2 className="related-small-article__title">{title}</h2>
        <span className="article-source related-small-article__source">{source}</span>
      </div>
    </article>
   </Link>
  );
};
