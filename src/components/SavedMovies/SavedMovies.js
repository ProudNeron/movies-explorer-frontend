import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {initialSavedCards} from "../../utils/initialCards.js";
import CheckboxContainer from "../CheckboxContainer/CheckboxContainer";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm></SearchForm>
      <CheckboxContainer />
      <MoviesCardList btnType= 'movies-card__btn_type_delete' cards={initialSavedCards} />
    </section>
  );
}

export default SavedMovies;
