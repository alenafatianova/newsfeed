const categoryIds = {
  index: 0,
  sport: 2,
  politics: 4,
  karpov: 6,
  technology: 1,
  fashion: 3,
}

const categoryName = {
  index: "Главная",
  sport: "Спорт",
  politics: "Политика",
  karpov: "KARPOV",
  technology: "Технологии",
  fashion: "Мода",
}


 const MainArticle = ({
  title,
  image,
  description,
  category,
  source,
  key
}) => {
  return (
    <article className="main_article" key={key}>
      <div className="main_article_image_container">
        <img className="main_article_image" src={image} alt="Фото статьи" />
      </div>
      <div className="main_article_content">
        <span className="article_category main_article_category">{category}</span>
        <h2 className="main_article_title">{title}</h2>
        <p className="main_article_text">{description}</p>
        <span className="main_article_source">
          <a href="#">{source}</a>
        </span>
      </div>
    </article>
  )
}

 const SmallArticle = ({ title, date, source, key }) => {
  return (
    <article className="short_article" key={key}>
      <h2 className="article_title">{title}</h2>
      <span className="article_date">
        {new Date(date).toLocaleDateString("ru-RU", {
          month: "long",
          day: "numeric",
        })}
      </span>
      <span className="article_source">
        <a href="#">{source}</a>
      </span>
    </article>
  )
}

const Navigation = ({ category, onNavClick, className }) => {
  return (
    <nav className="navigation grid">
    <a href="#" data-href="index" className="navigation_logo">
      <img src="./assets/logo.svg" alt="Логотип" className="logo_image" />
    </a>
    <ul className="navigation_list">
      {["index", "fashion", "technology", "politics",  "sport", "karpov"].map((item) => {
        return (
          <li className="navigation_item" key={item}>
            <a
              onClick={onNavClick}
              href="#"
              className={`${className} ${
                category === item ? "navigation_link--active" : ""
              }`}
              data-href={item}
            >
              {categoryName[item]}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
  )
}



const App = () => {
  const [category, setCategory] = React.useState("index");
  const [articles, setArticles] = React.useState({
    items: [],
    categories: [],
    sources: [],
  })

  const onNavClick = (e) => {
    e.preventDefault();
    setCategory(e.currentTarget.dataset.href);
  }
 
  React.useEffect(() => {
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
    <React.Fragment>
      <header className="header">
        <div className="container">
        <Navigation category={category} onNavClick={onNavClick} className={'navigation_link'} />
        </div>
      </header>

      <main className="main">
        <section className="articles">
          <div className="container grid">
         
            <section className="articles_left_column">
              {articles?.items?.slice(0, 3).map((item) => {
                return (
                  <MainArticle
                    //key={item.title}
                    category={
                      articles?.categories?.find(
                        ({ id }) => item?.category_id === id
                      )?.name
                    }
                    source={
                      articles?.sources?.find(({ id }) => item.source_id === id)
                        ?.name
                    }
                    description={item.description}
                    title={item.title}
                    image={item.image}
                  />
                );
              })}
            </section>
            <section className="articles_right_column">
              {articles?.items?.slice(3, 12).map((item) => {
                return (
                  <SmallArticle
                    //key={item.title}
                    title={item?.title}
                    date={item?.date}
                    source={
                      articles?.sources?.find(
                        ({ id }) => item?.source_id === id
                      )?.name
                    }
                  />
                );
              })}
            </section>
          </div>
        </section>
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
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
