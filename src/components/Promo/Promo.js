import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <article className="promo__article">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__desc">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href='#about-project'  className="promo__btn">Узнать больше</a>
      </article>
      <div className="promo__img" />
    </section>
  );
}

export default Promo;
