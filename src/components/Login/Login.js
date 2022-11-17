import './Login.css';
import {Link} from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm.js";

function Login() {
  return (
    <section className="login">
      <Link to='/' aria-label='Вернуться к промо' className='login__logo'></Link>
      <h1 className="login__title">Рады видеть!</h1>
      <AuthForm login={true} textBtn='Войти' />
      <p className="login__desc">
        Ещё не зарегистрированы? <Link to='/signup' className="login__link">Регистрация</Link>
      </p>
    </section>
  );
}

export default Login;
