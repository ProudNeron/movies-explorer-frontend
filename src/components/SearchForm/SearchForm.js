import './SearchForm.css';
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {useState, useEffect} from "react";

function SearchForm({ onSearch, loading }) {
  const formWithValidation = useFormWithValidation();
  const { search } = formWithValidation.values;
  const { handleChange, resetForm } = formWithValidation;
  const [error, setError] = useState('');

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      setError('Нужно ввести ключевое слово');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      onSearch(search);
      resetForm();
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
