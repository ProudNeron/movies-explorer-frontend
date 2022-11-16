import './AuthForm.css'

function AuthForm({login, textBtn}) {
  return (
    <form action="submit" className="form" noValidate>
      {
        !login && <label htmlFor="name" className="form__label">
        Имя
        <input type="text" value='Виталий' className="form__input"/>
        <span className="form__auth-error"></span>
      </label>
      }
      <label htmlFor="email" className="form__label">
        E-mail
        <input type="email" value='pochta@yandex.ru|' className="form__input"/>
        <span className="form__auth-error"></span>
      </label>
      <label htmlFor="password" className="form__label">
        Пароль
        <input type="password" value='Виталий' className="form__input form__input_invalid-value"/>
        <span className="form__auth-error">Что-то пошло не так...</span>
      </label>
      <button type='submit' aria-label={textBtn}
              className={'form__submit-btn ' + (login && 'form__submit-btn_loggedIn')}>{textBtn}</button>
    </form>
  );
}

export default AuthForm;
