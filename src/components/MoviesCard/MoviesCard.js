import './MoviesCard.css';

function MoviesCard({ btnType, movieData,  movieAdded, onLikeClick}) {
  const {nameRU, duration, image, trailer,} = movieData;

  const liked = movieAdded(movieData);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    onLikeClick(movieData, !liked);
  };

  const removeHandler = () => {
    onLikeClick(movieData, false);
  };

  return (
    <li className='movies-card'>
      <div className='movies-card__container'>
        <div className="movies-card__text-info">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{duration}</p>
        </div>
        <button onClick={btnType === 'movies-card__btn_type_like' ? handleBookmarkClick : removeHandler}
                className={"movies-card__btn" + " " + btnType + " " + (liked && 'movies-card__btn_liked')}></button>
      </div>
      <a href={trailer} target='_blank' aria-label='перейти к трейлеру'
         className="movies-card__trailer-link">
        <img src={image} alt={nameRU} className="movies-card__img"/>
      </a>
    </li>
  );
}

export default MoviesCard;
