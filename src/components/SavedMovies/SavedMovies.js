import './SavedMovies.css';
import {useState, useEffect} from "react";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import CheckboxContainer from "../CheckboxContainer/CheckboxContainer";
import {SHORT_DURATION_MIN} from "../../utils/consts";

function SavedMovies({movies, loading, loadingError, onLikeClick, movieAdded,}) {
  const [moviesInList, setMoviesInList] = useState([]);
  const [filterIsOn, setFilterIsOn] = useState(false);

  const filterShort = (moviesToFilter) => moviesToFilter.filter((item) => item.duration < SHORT_DURATION_MIN);
  const onFilterClick = () => setFilterIsOn(!filterIsOn);


  useEffect(() => {
    setMoviesInList(movies);
  }, [movies]);

  const searchFilter = (data, searchQuery) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');
      return data.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
    }
    return [];
  };

  const handleSearchInSaved = searchQuery => setMoviesInList(searchFilter(movies, searchQuery));
  return (
    <section className="saved-movies">
      <SearchForm onSearch={handleSearchInSaved} loading={loading}></SearchForm>
      {loading && <Preloader />}
      <CheckboxContainer onFilterClick={onFilterClick} />
      <MoviesCardList btnType='delete'
                      movies={filterIsOn ? filterShort(moviesInList) : moviesInList} onLikeClick={onLikeClick}
                      movieAdded={movieAdded} />
      {
        !loading
        && loadingError !== ''
        && <div className="movies__error">{loadingError}</div>
      }
    </section>
  );
}

export default SavedMovies;
