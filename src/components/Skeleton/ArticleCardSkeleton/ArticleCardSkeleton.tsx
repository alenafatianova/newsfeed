import React from 'react'
import './ArticleCardSkeleton.css'
import classNames from 'classnames'
import { ImageComponent } from '@components/Image/ImageComponent'
import { SkeletonText } from '../SkeletonText'

type ArticleCardSkeletonType = {
  hasImage?: boolean
  hasDescription?: string
  className?: string
}

export const ArticleCardSkeleton: React.FC<ArticleCardSkeletonType> = ({
  hasImage = true,
  hasDescription = true,
  className = '',
}) => {
  return (
    <div className={classNames('article-card', { 'article-card__has-description': hasDescription }, className)}>
      {hasImage && <ImageComponent className="article-card__image" />}
      <div className="article-card__content">
        <h2 className="article-card__title">
          <SkeletonText rowsCount={2} />
        </h2>
        {hasDescription && <span className="article-card__description"></span>}
        <div className="article-card__info">
          <SkeletonText />
        </div>
      </div>
    </div>

  )
}
