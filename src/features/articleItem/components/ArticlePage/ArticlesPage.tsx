import React, { useLayoutEffect, useState } from 'react'
import './ArticlesPage.css'
import { useParams } from 'react-router-dom'
import { SidebarArticleCard } from '../../../../components/SidebarArticleCard/SidebarArticleCard'
import { Hero } from '@components/Hero/Hero'
import { ArticleCard } from '../../../../components/ArticleCard/ArticleCard'
import { Source } from '../../../source/components/Source'
import { Title } from '@components/Title/Title'
import { beautifyDate, repeat } from '../../../../components/utils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRelatedArticles } from '../../../relatedNews/actions'
import { categoryNames } from '../../../categories/types'
import { categoryTitles } from '../../../categories/constants'
import { getSources } from '../../../source/selectors'
import { getRelatedArticles } from '../../../relatedNews/selectors'
import { getCachedArticleItem } from '../../selectors'
import { fetchArticleItem } from '../../actions'
import { AppDispatchType } from '@components/store'
import { HeroSkeleton } from '@components/Hero/HeroSkeleton'
import { SkeletonText } from '@components/Skeleton/SkeletonText'
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton'
import { useAdaptive } from '@components/customHooks'

export const Article: React.FC = () => {
  const { id }: { id?: number } = useParams()
  const dispatch = useDispatch<AppDispatchType>()
  const articleItem = useSelector(getCachedArticleItem(Number(id)))
  const relatedArticles = useSelector(getRelatedArticles(Number(id)))
  const sources = useSelector(getSources)
  const [loading, setLoading] = useState(false)
  const { isDesktop } = useAdaptive()

  useLayoutEffect(() => {
    if (!articleItem?.text) {
      setLoading(true)
      Promise.all([
        dispatch(fetchArticleItem(Number(id))).unwrap(),
        dispatch(fetchRelatedArticles(Number(id))).unwrap(),
      ]).then(() => {
        setLoading(false)
      })
    }
  }, [id])

  if (articleItem === null || relatedArticles === null) {
    return null
  }

  if (loading) {
    return (
      <div className="article-page">
        <div aria-hidden>
          {articleItem.title && articleItem.image ? (
            <Hero title={articleItem.title} image={articleItem.image} className="article-page__hero" />
          ) : (
            <HeroSkeleton hasText={true} className="article-page__hero" aria-label="Загрузка" />
          )}
          <div className="container article-page__main">
            <div className="article-page__info">
              <SkeletonText />
            </div>
            <div className="grid">
              <div className="article-page__content">
                <p>
                  <SkeletonText rowsCount={6} aria-label="Загрузка" />
                </p>
              </div>

              {isDesktop && (
                <aside className="sidebar__article-page">
                  {repeat((i) => {
                    return (
                      <SidebarArticleCardSkeleton key={i} className="sidebar__article-item" aria-label="Загрузка" />
                    )
                  }, 3)}
                </aside>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="article-page">
      <Hero title={articleItem.title} image={articleItem.image} className="article-page__hero" />
      <div className="container article-page__main">
        <section className="article-page__info" aria-label="Информация о статье">
          <span className="article-page__category">{articleItem?.category && articleItem?.category?.name}</span>
          <span className="article-page__date">{beautifyDate(articleItem?.date)}</span>
          {articleItem && articleItem.link.length > 0 && (
            <Source className={'article-page__source'} href={articleItem.link}>
              {categoryTitles[articleItem?.source?.name as categoryNames]}
            </Source>
          )}
        </section>
        <section className="grid" aria-label="Статья">
          <div className="article-page__content">
            <p>{articleItem?.text}</p>
          </div>

          {isDesktop && (
            <aside className="sidebar__article-page" aria-label="Второстепенный список статей">
              {relatedArticles.slice(3, 9).map((item) => {
                const source = sources?.find(({ id }) => item.source_id === id)
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
                )
              })}
            </aside>
          )}
        </section>
      </div>

      <section className="article-page__related-articles" aria-label="Читайте также">
        <div className="container">
          <Title Component={'h2'} className="article-page__related-articles-title">
            Читайте также
          </Title>

          <div className="grid article-page__related-articles-list">
            {relatedArticles?.slice(0, 3).map((article) => {
              const source = sources?.find(({ id }) => article?.source_id === id)
              return (
                <ArticleCard
                  className="article-page__related-articles-item"
                  key={article.id}
                  date={article.date}
                  source={source?.name}
                  description={article.description}
                  title={article.title}
                  id={article.id}
                />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
