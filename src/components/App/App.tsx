import { categoryIds } from '../../utils';
import { Articles } from '../Articles/Articles';
import { Article } from '../Article/Article';
import React, { useState, useEffect } from 'react';
import './App.css';
import { NewsResponse } from '../../types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const App: React.FC = () => {
  const [category, setCategory] = useState<string>('index');
  const [articles, setArticles] = useState<NewsResponse>({ items: [], categories: [], sources: [] });


  const onNavClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    const categoryLink = e.currentTarget?.dataset?.href;
    categoryLink && setCategory(categoryLink);
  };

  useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[category] || '')
      .then((response) => response.json())
      .then((response: NewsResponse) => {
        setArticles(response);
      });
  }, [category]);

  
  return (
    <BrowserRouter>
      <Header onNavClick={onNavClick} category={category}  />
      <Routes>
          <Route 
            path="/" 
            element={
            <Articles articles={articles} />
          }/>
          <Route 
            path='/article/:id' 
            element={
              <Article categories={articles.categories} sources={articles.sources} />
            }/>
      </Routes>
      <Footer onNavClick={onNavClick} category={category} />
    </BrowserRouter>
  );
};
