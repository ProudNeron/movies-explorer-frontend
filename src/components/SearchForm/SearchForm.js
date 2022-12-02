import './SearchForm.css';
import {useState} from "react";

function SearchForm({onSearch, loading, query}) {
  const [search, setSearch] = useState(query ? query : '');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      setError('Нужно ввести ключевое слово');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      onSearch(search);
    }
  };

  return (
    <form action="submit" onSubmit={handleSubmit} noValidate className="search-form">
      <label className="search-form__icon"/>
      <input type='text'
             onChange={handleChange}
             name='search'
             required
             value={search || ''}
             disabled={loading}
             autoComplete='off'
             placeholder='Фильм' className="search-form__input"/>
      <span className='search-form__error-text'>{error}</span>
      <button type='submit' aria-label='поиск' className="search-form__submit-btn"/>
    </form>
  );
}

export default SearchForm;
