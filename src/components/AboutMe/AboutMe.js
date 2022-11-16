import './AboutMe.css';
import studentPhoto from '../../images/student-photo.jpg'

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__profile">
        <article className='about-me__article'>
          <h3 className="about-me__subtitle">Виталий</h3>
          <p className="about-me__desc">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__paragraph">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть
            жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании
            «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.</p>
          <a href="https://github.com/ProudNeron?tab=repositories" target='_blank' className="about-me__ref">Github</a>
        </article>
        <img src={studentPhoto} alt="фото" className="about-me__photo"/>
      </div>
    </section>
  );
}

export default AboutMe;
