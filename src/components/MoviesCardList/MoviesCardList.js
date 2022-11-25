import './MoviesCardList.css';
import {useState, useEffect} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import {DESKTOP_WIDTH, TABLET_WIDTH, MOBILE_WIDTH} from "../../utils/consts";

function MoviesCardList({btnType, movies, onLikeClick, movieAdded}) {
  const [currentCount, setCurrentCount] = useState(0);
  const [nextRow, setNextRow] = useState(3);
  const [moviesInList, setMoviesInList] = useState([]);


  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const windowSize = window.innerWidth;
    setNextRow(getCount(windowSize).extra);
    const count = Math.min(movies.length, getCount(windowSize).first);
    setMoviesInList(movies.slice(0, count));
    setCurrentCount(count);
  }, [movies]);

  const handleResize = () => {
    const windowSize = window.innerWidth;
    setNextRow(getCount(windowSize).extra);
  };

  const getCount = (windowSize) => {
    if (windowSize >= DESKTOP_WIDTH) {
      return { first: 12, extra: 3 };
    } if (windowSize > MOBILE_WIDTH && windowSize <= TABLET_WIDTH) {
      return { first: 8, extra: 2 };
    }
    return { first: 5, extra: 2 };
  };

  const renderNextRow = () => {
    const count = Math.min(movies.length, currentCount + nextRow);
    const extraMovies = movies.slice(currentCount, count);
    setMoviesInList([...moviesInList, ...extraMovies]);
    setCurrentCount(count);
  };

  const renderMore = () => renderNextRow();
  return (
    <>
      <ul className='movies-card-list'>
        {
          moviesInList.map((movie) => {
            return (
              <MoviesCard key={movie.movieId} movieData={movie} btnType={btnType} movieAdded={movieAdded}
                          onLikeClick={onLikeClick}  />
            );
          })
        }
      </ul>
      { currentCount < movies.length && <button type="button" aria-label='Ещё' onClick={renderMore}
                                                className="movies-card-list__more-btn">Ещё</button>}
    </>
  );
}

export default MoviesCardList;
