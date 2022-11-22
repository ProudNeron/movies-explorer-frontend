import './Movies.css';
import {useState} from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import CheckboxContainer from "../CheckboxContainer/CheckboxContainer";
import Preloader from '../Preloader/Preloader';
import {SHORT_DURATION_MIN} from "../../utils/consts";

function Movies({savedMovies, onSubmitSearch, movies, loading, loadingError, onLikeClick, movieAdded,}) {
  const [filterIsOn, setFilterIsOn] = useState(false);

  const filterShort = movies => movies.filter(mov => mov.duration < SHORT_DURATION_MIN);

  const onFilterClick = () => {
    setFilterIsOn(!filterIsOn);
  };
  return (
    <section aria-label='Фильмы' className='movies'>
      <SearchForm onSearch={onSubmitSearch}/>
      {loading && <Preloader/>}
      <CheckboxContainer onFilterClick={onFilterClick}/>
      {!loading
        && loadingError === ''
        && <MoviesCardList btnType='movies-card__btn_type_like'
                           onLikeClick={onLikeClick}
                           savedMovies={savedMovies}
                           movies={filterIsOn ? filterShort(movies) : movies}
                           movieAdded={movieAdded}/>}
      {
        !loading
        && loadingError !== ''
        && <div className="movies__error">{loadingError}</div>
      }
    </section>
  );
}

export default Movies;
