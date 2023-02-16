import React, { useEffect, useState, Fragment } from 'react';
import { Navigation } from './Navigation.js';
import { Articles } from './Articles.js';
import { categoryIds } from './utils.js';


export const App = () => {
    const [category, setCategory] = useState("index");
    const [articles, setArticles] = useState({
      items: [],
      categories: [],
      sources: [],
    })
  
    const onNavClick = (e) => {
      e.preventDefault();
      setCategory(e.currentTarget.dataset.href);
    }
   
    useEffect(() => {
      fetch(
        "https://frontend.karpovcourses.net/api/v2/ru/news/" +
          categoryIds[category] || ""
      )
        .then((res) => res.json())
        .then((response) => {
          setArticles(response);
        });
    }, [category])
  
    return (
      <Fragment>
        <header className="header">
          <div className="container">
          <Navigation category={category} onNavClick={onNavClick} className={'navigation_link'} />
          </div>
        </header>
  
        <main className="main">
          <Articles articles={articles}/>
        </main>
  
        <footer className="footer">
          <div className="container">
            <Navigation 
            className={'footer_navigation_link'}
            onNavClick={onNavClick}
            category={category}
            />
            <div className="footer_additional_links">
              <span className="footer_courses_link">
                Сделано на Frontend курсе в
                <a
                  href="https://karpov.courses/frontend"
                  className="course_link"
                  target="_blank"
                >
                  Karpov.Courses
                </a>
              </span>
              <span className="copyright_year">© 2021</span>
            </div>
          </div>
        </footer>
      </Fragment>
    );
  };
  