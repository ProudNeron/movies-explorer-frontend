import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './Header.css';
import Navigation from "../Navigation/Navigation.js";
import logo from '../../images/logo.svg';
import BurgerMenu from "../BurgerMenu/BurgerMenu.js";

function Header({theme, isLoggedIn}) {
  const [width ,setWidth] = useState(window.innerWidth);

  const updateWidth = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  const isDesktop = width > 1060;

  const [isOpen, setIsOpen] = useState(false);
  const handleBurgerMenuClick = () => setIsOpen(!isOpen)

  return (
    <header className={'header ' + (theme  && 'header_theme_dark')}>
      <Link to='/' aria-label='Вернуться к промо'><img src={logo} alt="Лого" className='header__logo'/></Link>
      {isLoggedIn && !isDesktop && (
        <button type='button' aria-label='Навигация' onClick={handleBurgerMenuClick}
                className="header__burger-btn"></button>)}
      <Navigation isLoggedIn={isLoggedIn} isDesktop={isDesktop}/>
      {isLoggedIn && <BurgerMenu isOpen={isOpen} closeHandler={handleBurgerMenuClick} />}
    </header>
  );
}

export default Header;
