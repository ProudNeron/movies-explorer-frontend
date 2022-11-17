import './SearchForm.css';

function SearchForm() {
  return (
    <form action="submit" noValidate className="search-form">
      <label className="search-form__icon"/>
      <input type="text" placeholder='Фильм' className="search-form__input"/>
      <span className='search-form__error-text'></span>
      <button aria-label='поиск' className="search-form__submit-btn"/>
    </form>
  );
}

export default SearchForm;
