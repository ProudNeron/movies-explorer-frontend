import './BurgerMenu.css';
import {Link, NavLink} from "react-router-dom";
import React from "react";

function BurgerMenu({isOpen, closeHandler}) {

  return (
    <div className={`burger-menu ${isOpen ? 'burger-menu_is-open' : ''}`}>
      <button onClick={closeHandler} type="button" aria-label='Закрыть'
              tabIndex={0} className="burger-menu__close-btn" />
      <ul className="burger-menu__link-list">
        <li className="burger-menu__list-item">
          <NavLink to="/" aria-label='Главная' className={"burger-menu__link"}>
            Главная
          </NavLink>
        </li>
        <li className="burger-menu__list-item">
          <NavLink to="/movies" aria-label='Фильмы' className="burger-menu__link">
            Фильмы
          </NavLink>
        </li>
        <li className="burger-menu__list-item">
          <NavLink to="/saved-movies" aria-label='Сохранённые фильмы' className="burger-menu__link">
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <Link to='/profile' aria-label='Аккаунт' className='burger-menu__profile-link'>
        Аккаунт
        <div className="burger-menu__icon"></div>
      </Link>
    </div>
  );
}

export default BurgerMenu;

