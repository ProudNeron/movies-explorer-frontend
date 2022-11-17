import './AboutProject.css';

function AboutProject() {
  return (
    <section id='about-project' className='about-project'>
      <h2 className="about-project__title">О&nbsp;проекте</h2>
      <div className="about-project__table">
        <article className="about-project__article">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.</p>
        </article>
        <article className="about-project__article">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="flex-row">
        <div className="flex-row__item flex-row__item_theme_green">1 неделя</div>
        <div className="flex-row__item flex-row__item_theme_grey flex-row__item_type_stretched">4 недели</div>
      </div>
      <div className="flex-row">
        <div className="flex-row__item flex-row__item_theme_transparent">Back-end</div>
        <div className="flex-row__item flex-row__item_theme_transparent flex-row__item_type_stretched">Front-end</div>
      </div>
    </section>
  )
}

export default AboutProject;
