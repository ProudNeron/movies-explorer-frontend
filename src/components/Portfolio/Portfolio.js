import './Portfolio.css'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a href="https://github.com/ProudNeron/how-to-learn"
             target='_blank' className="portfolio__ref">Статичный сайт <span
            className="portfolio__arrow">&#8599;</span></a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/ProudNeron/russian-travel"
             target='_blank' className="portfolio__ref">Адаптивный сайт <span
            className="portfolio__arrow">&#8599;</span></a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/ProudNeron/react-mesto-api-full"
             target='_blank' className="portfolio__ref">Одностраничное приложение <span
            className="portfolio__arrow">&#8599;</span></a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
