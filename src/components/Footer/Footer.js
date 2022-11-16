import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__content">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__ref-list">
          <li className="footer__list-item"><a href="https://practicum.yandex.ru/"
                                               className="footer__ref">Яндекс.Практикум</a></li>
          <li className="footer__list-item"><a href="https://github.com/ProudNeron"
                                               className="footer__ref">Github</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
