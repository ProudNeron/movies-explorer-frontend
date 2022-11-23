import './AuthForm.css'
import {useState} from "react";
import {useEffect} from "react";

function AuthForm({login, textBtn, onSubmit, formData, signUpError, signInError,}) {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = formData;

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <form action="submit" onSubmit={onSubmit} className="form" noValidate>
      {
        !login && <label htmlFor="name" className="form__label">
          Имя
          <input type="text"
                 required
                 minLength='2'
                 maxLength='30'
                 name='name'
                 pattern='^(?=.{2,30}$)[A-Za-zа-яА-ЯёЁ/\s/-]*$'
                 value={values.name || ''}
                 onChange={handleChange}
                 autoComplete='off'
                 placeholder='Имя'
                 className={`form__input ${errors.name && 'form__input_invalid-value'}`}/>
          <span className="form__auth-error">{errors.name}</span>
        </label>
      }
      <label htmlFor="email" className="form__label">
        E-mail
        <input type="email"
               name='email'
               required
               value={values.email || ''}
               onChange={handleChange}
               placeholder='email'
               autoComplete='off'
               className={`form__input ${errors.email && 'form__input_invalid-value'}`}/>
        <span className="form__auth-error">{errors.email}</span>
      </label>
      <label htmlFor="password" className="form__label">
        Пароль
        <input type="password"
               name='password'
               required
               value={values.password || ''}
               onChange={handleChange}
               minLength='2'
               placeholder='Пароль'
               autoComplete='off'
               className={`form__input ${errors.password && 'form__input_invalid-value'}`}/>
        <span className="form__auth-error">{errors.password}</span>
      </label>
      {signUpError && <span className="form__auth-error">Ошибка при регистрации</span>}
      {signInError && <span className="form__auth-error">Вы не авторизированы</span>}
      <button type='submit' aria-label={textBtn}
              disabled={!isValid}
              className={
        'form__submit-btn ' + (login && 'form__submit-btn_loggedIn') + (isValid ? '' : ' form__submit-btn_disabled')}>
        {textBtn}
      </button>
    </form>
  );
}

export default AuthForm;
