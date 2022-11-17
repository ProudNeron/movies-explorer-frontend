import './Profile.css';

function Profile() {
  return (
    <section className='profile'>
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form action="submit" className="profile__form" noValidate>
        <label htmlFor="name" className="profile__input-label">
          Имя
          <input type="text" value='Виталий' className="profile__input"/>
        </label>
        <label htmlFor="email" className="profile__input-label">
          E-mail
          <input type="text" value='pochta@yandex.ru' className="profile__input"/>
        </label>
        <button type='submit' aria-label='Редактировать' className="profile__submit-btn">Редактировать</button>
      </form>
      <button type='button' aria-label='Выйти из аккаунта' className="profile__logout-btn">Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
