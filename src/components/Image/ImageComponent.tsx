import classNames from 'classnames'
import './ImageComponent.css'
import React, { ImgHTMLAttributes, useMemo, useState } from 'react'
import { ArticleImageType, ExtendedImageType } from '@features/articleItem/types'

interface ImageType extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  src?: string
  skeleton?: boolean
  data?: ExtendedImageType
  maxWidth?: number
}

type ExtendedVariantType = ArticleImageType & {
  media: string
}

export const ImageComponent: React.FC<ImageType> = ({
  className,
  src = '',
  data,
  onLoad,
  maxWidth = Number.POSITIVE_INFINITY,
  skeleton = false,
  ...rest
}: ImageType) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  const hasImage = src.length > 0 || (data && data?.source.length > 0)
  const imageSrc = useMemo(() => {
    return src || data?.source
  }, [src, data])

  const imagesVariants: ExtendedVariantType[] = useMemo(() => {
    if (!data) return []

    // create a new array to prevent mutating of the existing datas (concat)
    // then sort every image by the width
    const variants = data.variants
      .concat([])
      .filter((variant) => variant.width <= maxWidth)
      .sort((a, b) => {
        if (a.width === b.width) {
          return a.format < b.format ? 1 : -1
        }
        return a.width - b.width
      })

    //const isAllSameType = variants.length && variants[0].type === variants[variants.length - 1].type
    const lastType = variants.length && variants[variants.length - 1].type

    return variants.map<ExtendedVariantType>((element) => {
      return {
        ...element,
        media: element.type === lastType ? 'all' : `(max-width: ${element.width}px)`,
      }
    })
  }, [data, maxWidth])

  return (
    <div
      className={classNames(
        'image',
        {
          'image--loaded': imgLoaded,
          'skeleton-gradient': skeleton || (src.length > 0 && !imgLoaded),
        },
        className
      )}
    >
      {hasImage && (
        <picture>
          {imagesVariants.map((element) => {
            return (
              <source key={element.url} type={`image/${element.format}`} srcSet={element.url} media={element.media} />
            )
          })}
          <img
            className="image__element"
            src={imageSrc}
            {...rest}
            onLoad={(e) => {
              setImgLoaded(true)
              onLoad && onLoad(e)
            }}
          />
        </picture>
      )}
    </div>
  )
}
