import './Movies.css';
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import CheckboxContainer from "../CheckboxContainer/CheckboxContainer";
import Preloader from '../Preloader/Preloader';
import {filterShort} from "../../utils/utils";

function Movies({
                  onSubmitSearch, movies, loading, loadingError, onLikeClick, movieAdded,
                  filterIsOn, switchFilter, query,
                }) {

  const onFilterClick = () => {
    switchFilter(!filterIsOn);
    localStorage.setItem('filterIsOn', JSON.stringify(!filterIsOn));
  };
  return (
    <section aria-label='Фильмы' className='movies'>
      <SearchForm query={query} loading={loading} onSearch={onSubmitSearch}/>
      {loading && <Preloader/>}
      <CheckboxContainer onFilterClick={onFilterClick} filterIsOn={filterIsOn}/>
      {!loading
        && loadingError === ''
        && <MoviesCardList btnType='like'
                           onLikeClick={onLikeClick}
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
