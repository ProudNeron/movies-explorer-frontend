import './MoviesCard.css';
import {transformDurationToHoursAndMinutes} from "../../utils/utils";

function MoviesCard({ btnType, movieData,  movieAdded, onLikeClick}) {
  const {nameRU, duration, image, trailerLink,} = movieData;

  const liked = movieAdded(movieData);

  const handleLikeClick = (e) => {
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
          <p className="movies-card__duration">{transformDurationToHoursAndMinutes(duration)}</p>
        </div>
        {btnType === 'like'
          ? <button type='button' aria-label='сохранить' onClick={handleLikeClick}
                    className={'movies-card__btn-like' + (liked ? ' movies-card__btn-like_active' : '')} />
          : <button type='button' aria-label='удалить' onClick={removeHandler}
                    className='movies-card__btn-delete' />}
      </div>
      <a href={trailerLink} target='_blank' aria-label='перейти к трейлеру'
         className="movies-card__trailer-link">
        <img src={image} alt={nameRU} className="movies-card__img"/>
      </a>
    </li>
  );
}

export default MoviesCard;
