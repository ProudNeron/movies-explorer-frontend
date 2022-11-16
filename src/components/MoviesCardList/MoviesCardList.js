import './MoviesCardList.css';
import img1 from '../../images/movie-card-img.jpg';
import img2 from '../../images/movie-card-img2.jpg';
import img3 from '../../images/movie-card-img3.jpg';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({btnType, cards}) {
  return (
    <ul className='movies-card-list'>
      {
        cards.map(card => {
          return (
            <MoviesCard title={card.name}
                        duration={card.duration}
                        imgLink={card.imgLink === '1' ? img1 : (card.imgLink === '2' ? img2 : img3)}
                        btnType={btnType}
                        isLiked={false}
                        key={card._id}/>
          );
        })
      }
      <MoviesCard title='фильм'
                  duration='1ч 3мин' imgLink={img1} btnType='movies-card__btn_type_like' isLiked={true}></MoviesCard>
    </ul>
  );
}

export default MoviesCardList
