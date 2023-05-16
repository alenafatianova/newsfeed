import classNames from 'classnames';
import './ImageComponent.css';
import React, { ImgHTMLAttributes, useState } from 'react';

interface ImageType extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src?: string;
}

export const ImageComponent: React.FC<ImageType> = ({ className, src, onLoad, ...rest }: ImageType) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className={classNames('image', { 'image--loaded': imgLoaded }, className)}>
      <img
        className="image__element"
        src={src}
        {...rest}
        onLoad={(e) => {
          setImgLoaded(true);
          onLoad && onLoad(e);
        }}
      />
    </div>
  );
};
