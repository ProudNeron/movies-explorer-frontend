import './Register.css';
import {Link} from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function Register({handleSignUp, signUpError}) {
  const formWithValidation = useFormWithValidation();
  const { name, email, password } = formWithValidation.values;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp({name, email, password});
    formWithValidation.resetForm();
  };
  return (
    <section className="register">
      <Link to='/' aria-label='Вернуться к промо' className='register__logo'></Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <AuthForm login={false} onSubmit={handleSubmit} signUpError={signUpError} formData={formWithValidation}
                textBtn='Зарегистрироваться' />
      <p className="register__desc">
        Уже зарегистрированы? <Link to='/signin' className="register__link">Войти</Link>
      </p>
    </section>
  );
}

export default Register;
