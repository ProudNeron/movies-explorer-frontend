import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import './Navigation.css';

function Navigation({ isLoggedIn, isDesktop, }) {
  const navigate = useNavigate();
  const clickHandler = () => navigate('/signin');
  return (
    <>
      {!isLoggedIn ? (
        <nav className='navigation'>
          <Link to='/signup' aria-label='Регистрация' className='navigation__register-btn'>Регистрация</Link>
          <Link to='/signin' aria-label='Войти' className='navigation__entry-btn'>Войти</Link>
      </nav>) : isDesktop ? (
        <nav className='navigation'>
          <ul className="navigation__list">
            <li className="navigation__list-item">
              <Link to='/movies' aria-label='Фильмы' className='navigation__link'>Фильмы</Link>
            </li>
            <li className="navigation__list-item">
              <Link to='/savedmovies' aria-label='Сохранённые фильмы'
                    className='navigation__link'>Сохранённые фильмы</Link>
            </li>
            <li className="navigation__list-item ">
              <Link to='/profile' aria-label='Аккаунт' className='navigation__link navigation__link_ref_user-acc'>
                Аккаунт
                <div className="navigation__icon"></div>
              </Link>
            </li>
          </ul>
        </nav>
      ) : ''}
    </>
  );
}

export default Navigation;
