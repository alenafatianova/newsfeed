import React, { useEffect, useState } from 'react'
import './PartnersArticles.css'
import { PartnersPostsType } from '../types'
import { useTranslation } from 'react-i18next'
import { apiFetchSortedPartnerArticle } from '@components/publicApi'

export const PartnersArticles: React.FC = () => {
  const [partnersArticle, setPartnersArticle] = useState<Record<
    keyof PartnersPostsType,
    { stringValue: string }
  > | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    ;(async () => {
      const data = await apiFetchSortedPartnerArticle()

      setPartnersArticle(data)
    })()
  }, [])

  if (!partnersArticle) return null

  return (
    <>
      <article className="partner-article">
        <div className="partner-article__container container grid">
          <div className="partner-article-image-container">
            <img className="partner-article-image" src={partnersArticle.image.stringValue} alt="Фотография статьи" />
          </div>

          <div className="partner-article-content">
            <span className="partner-article-caption">
              {t(`partner_article_caption`, { name: partnersArticle['company-name'] })}
            </span>
            <h2 className="partner-article-title">{partnersArticle.articleTitle.stringValue}</h2>
            <p className="partner-article-text">{partnersArticle.description.stringValue}</p>
          </div>
        </div>
      </article>
    </>
  )
}
