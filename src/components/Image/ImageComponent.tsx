import classNames from 'classnames'
import './ImageComponent.css'
import React, { CSSProperties, ImgHTMLAttributes, useMemo, useState } from 'react'
import { ArticleImageType, ExtendedImageType } from '../../features/articleItem/types'

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

    const isAllSameType = variants.length && variants[0].type === variants[variants.length - 1].type
    const lastType = variants.length && variants[variants.length - 1].type

    return variants.map<ExtendedVariantType>((element) => {
      return {
        ...element,
        media: element.type === lastType ? 'all' : `(max-width: ${element.width}px)`,
      }
    })
  }, [data, maxWidth])

  // const styleFromAPI = useMemo(() => {
  //   const style: Record<string, CSSProperties> = {}
  //   if (data && data?.variants.length) {
  //     return (style['--image-container-height'] = ((100 * imagesVariants[0].height) / imagesVariants[0].width +
  //       'vw') as CSSProperties)
  //   }

  // }, [data])

  const styleFromAPI = useMemo(() => {
    if (data && data.variants.length) {
      const heightInVw = (100 * imagesVariants[0].height) / imagesVariants[0].width + 'vw'
      return {
        '--image-container-height': heightInVw,
      } as CSSProperties
    }
    // Return an empty object if data or data.variants.length is falsy
    return {}
  }, [data])

  return (
    <div
      style={styleFromAPI}
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
