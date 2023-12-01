import React from 'react'
import './SidebarArticleCard.css'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { beautifyDate } from '@components/utils'
import { ImageComponent } from '@components/Image/ImageComponent'
import { useTranslation } from 'react-i18next'
import { ExtendedImageType } from '@features/articleItem/types'

type ArticleCardType = {
  id: number
  title: string
  source: string
  image: ExtendedImageType
  date: string
  className?: string
}

export const SidebarArticleCard: React.FC<ArticleCardType> = ({ id, title, source, image, date, className }) => {
  const { i18n } = useTranslation()
  return (
    <>
      <Link to={`/article/${id}`} className={classNames('sidebar-article-card', className)}>
        <article className="sidebar-article-card__in">
          <div className="sidebar-article-card__media">
            <ImageComponent className="sidebar-article-card__image" data={image} alt={title} maxWidth={360} />
            <div className="sidebar-article-card__date">{beautifyDate(date, i18n.language)}</div>
          </div>
          <h3 className="sidebar-article-card__title">{title}</h3>
          <div className="sidebar-article-card__source">{source}</div>
        </article>
      </Link>
    </>
  )
}
