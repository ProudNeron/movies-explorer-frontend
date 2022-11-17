import './Register.css';
import {Link} from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

function Register() {
  return (
    <section className="register">
      <Link to='/' aria-label='Вернуться к промо' className='register__logo'></Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <AuthForm login={false} textBtn='Зарегистрироваться' />
      <p className="register__desc">
        Уже зарегистрированы? <Link to='/signin' className="register__link">Войти</Link>
      </p>
    </section>
  );
}

export default Register;
