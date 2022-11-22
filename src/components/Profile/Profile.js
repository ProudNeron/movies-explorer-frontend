import './Profile.css';
import {useEffect} from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function Profile({currentUser, logout, updateUserInfo, editSuccess, editFailed,}) {
  const { values, setValues, handleChange, errors, isValid, setIsValid, } = useFormWithValidation();

  useEffect(() => {
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, setValues, setIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(values);
  };

  return (
    <section className='profile'>
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form action="submit" onSubmit={handleSubmit} className="profile__form" noValidate>
        <label htmlFor="name" className="profile__input-label">
          Имя
          <input type="text" id='name' required name='name' minLength='2' maxLength='30' value={values.name || ''}
                 placeholder='Имя' onChange={handleChange} autoComplete='off' className="profile__input"/>
          <span className="profile__input-error">{errors.name}</span>
        </label>
        <label htmlFor="email" className="profile__input-label">
          E-mail
          <input type="email" id='email' required name='email' value={values.email || ''} placeholder='email'
                 autoComplete='off' className="profile__input"/>
          <span className="profile__input-error">{errors.email}</span>
        </label>
        {editSuccess && <p className="profile__submit-success">Данные успешно изменены!</p>}
        {editFailed && <p className="profile__submit-failed">Ошибка при изменении данных</p>}
        <button type='submit'
                disabled={(values.name === currentUser.name && values.email === currentUser.email) || !isValid}
                aria-label='Редактировать'
                className={"profile__submit-btn" +
                  (isValid && (values.name !== currentUser.name || values.email !== currentUser.email) ?
                    '' :
                    ' profile__submit-btn_non-active')}>
        Редактировать
        </button>
      </form>
      <button type='button' onClick={logout} aria-label='Выйти из аккаунта' className="profile__logout-btn">
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
