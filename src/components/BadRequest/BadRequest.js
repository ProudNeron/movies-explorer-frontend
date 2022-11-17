import {useNavigate} from "react-router-dom";
import './BadRequest.css';

function BadRequest() {
  const navigate = useNavigate();
  const clickHandle = () => navigate(-1);
  return (
    <div className='bad-request'>
      <h1 className="bad-request__title">404</h1>
      <p className="bad-request__desc">Страница не найдена</p>
      <button aria-label='Назад' onClick={clickHandle} className="bad-request__btn">Назад</button>
    </div>
  );
}

export default BadRequest;
