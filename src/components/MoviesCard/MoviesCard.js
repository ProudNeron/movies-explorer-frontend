import './MoviesCard.css';

function MoviesCard({title, duration, imgLink, btnType, isLiked}) {
  return (
    <li className='movies-card'>
      <div className='movies-card__container'>
        <div className="movies-card__text-info">
          <h2 className="movies-card__title">{title}</h2>
          <p className="movies-card__duration">{duration}</p>
        </div>
        <button className={"movies-card__btn " + btnType + " " + (isLiked && 'movies-card__btn_liked')}></button>
      </div>
      <img src={imgLink} alt={title} className="movies-card__img"/>
    </li>
  );
}

export default MoviesCard;
