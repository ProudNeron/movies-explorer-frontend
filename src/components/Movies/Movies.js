import './Movies.css';
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import {initialCards} from "../../utils/initialCards.js";
import CheckboxContainer from "../CheckboxContainer/CheckboxContainer";

function Movies() {
  return (
    <section aria-label='Фильмы' className='movies'>
      <SearchForm />
      <CheckboxContainer/>
      <MoviesCardList btnType='movies-card__btn_type_like' cards={initialCards} />
      <button type="submit" aria-label='Ещё' className="movies__more-btn">Ещё</button>
    </section>
  );
}

export default Movies;
