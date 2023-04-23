import React from 'react';
import './Hero.css';
import classNames from 'classnames';

type HeroPropsType = {
  image?: string;
  title: string;
  text?: string;
  className?: string;
};

export const Hero: React.FC<HeroPropsType> = ({ image, title, text, className }) => {
  const hasImage = image && image.length > 0;
  return (
    <section className={classNames('hero', { 'hero__no-image': !hasImage }, className)}>
      <div className="hero__in" style={{ backgroundImage: `url(${image})` }}>
        <div className="hero__container container">
          <div className="hero__content">
            <h1 className="hero__title">{title}</h1>
            {text && text?.length > 0 && <p className="hero__text">{text}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};
