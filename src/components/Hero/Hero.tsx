import React, { memo } from 'react'
import './Hero.css'
import classNames from 'classnames'
import { Title } from '../../components/Title/Title'
import { ImageComponent } from '../../components/Image/ImageComponent'
import { ExtendedImageType } from '../../features/articleItem/types'

type HeroPropsType = {
  image?: ExtendedImageType | string
  title: string
  text?: string
  className?: string
}

export const Hero = memo<HeroPropsType>(({ image, title, text, className }: HeroPropsType) => {
  const hasSimpleImage = image && typeof image === 'string' && image.length > 0
  const hasExtendedImage = image && typeof image === 'object' && image.source.length > 0
  return (
    <section className={classNames('hero', { 'hero__no-image': !hasSimpleImage && !hasExtendedImage }, className)}>
      <div className="hero__in">
        {hasSimpleImage && <ImageComponent src={image} className="hero__image" alt={title} />}
        {hasExtendedImage && <ImageComponent data={image} className="hero__image" alt={title} />}
        <div className="hero__container container">
          <div className="hero__content">
            <Title className="hero__title">{title}</Title>
            {text && text?.length > 0 && <p className="hero__text">{text}</p>}
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'
