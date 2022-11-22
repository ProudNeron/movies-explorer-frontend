import {useEffect, useState} from "react";
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import './App.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from "../Register/Register.js";
import BadRequest from "../BadRequest/BadRequest.js";
import Profile from "../Profile/Profile.js";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  register,
  login,
  getUserInfo,
  patchUserData,
  getSavedMovies,
  putLike,
  removeLike,
  checkToken
} from '../../utils/MainApi';
import {getAllMovies} from "../../utils/MoviesApi";
import movies from "../Movies/Movies";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [signUpError, setSignUpError] = useState(false);
  const [signInError, setSignInError] = useState(false);

  const [editSuccess, setEditSuccess] = useState(false);
  const [editFailed, setEditFailed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchSavedMovies, setSearchSavedMovies] = useState([]);
  const [query, setQuery] = useState();

  const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    getUserInfo(token)
      .then((data) => {
          setCurrentUser(data);
          localStorage.setItem('currentUser', JSON.stringify(data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const path = location.pathname;
    if (token) {
      checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          getCurrentUser();
          navigate(path);
        })
        .catch((err) => {
          localStorage.removeItem('token');
          navigate('/');
          console.log(err);
        });
    }
  }, []);

  const handleSignIn = ({email, password}) => {
    login({email, password})
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          getCurrentUser();
          navigate('/movies');
        }
      })
      .catch((err) => {
        setSignInError(true);
        console.log(err);
      });
  };

  const handleSignUp = ({name, email, password}) => {
    register({name, email, password})
      .then((res) => {
        if (res) {
          handleSignIn({email, password});
        }
      })
      .catch((err) => {
        setSignUpError(true);
        console.log(err);
      });
  };

  const extractSearch = (data, searchQuery) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');
      const filterData = data.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
      if (filterData.length === 0) {
        setLoadingError('Ничего не найдено');
      } else {
        setLoadingError('');
      }
      return filterData;
    }
    return [];
  };

  const handleSearch = (searchQuery) => {
    setLoading(true);
    setTimeout(() => {
      setQuery(searchQuery);
      setSearchMovies(extractSearch(allMovies, searchQuery));
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    setSearchSavedMovies(extractSearch(savedMovies, query));
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);

  const getArrayOfSavedMovies = (data) => {
    const savedMoviesData = data.map((j) => {
      return {
        ...j,
        id: j.moviedId
      }
    });
    localStorage.setItem('savedMovies', JSON.stringify(savedMoviesData));
    setSavedMovies(savedMoviesData);
  };

  const getArrayOfAllMovies = (data) => {
    const moviesData = data.map((j) => {
      const imageUrl = j.image.url;
      return {
        ...j,
        image: `https://api.nomoreparties.co${imageUrl}`,
        trailer: j.trailerLink,
      };
    });
    localStorage.setItem('allMovies', JSON.stringify(moviesData));
    setAllMovies(moviesData);
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([getAllMovies(), getSavedMovies()])
        .then(([allMovies, savedMovies]) => {
          getArrayOfAllMovies(allMovies);
          getArrayOfSavedMovies(savedMovies);
        })
        .catch(() => {
          localStorage.removeItem('allMovies');
          localStorage.removeItem('savedMovies');
          setLoadingError('Во время запроса произошла ошибка. '
            + 'Возможно, проблема с соединением или сервер недоступен. '
            + 'Подождите немного и попробуйте ещё раз');
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const allMoviesArr = JSON.parse(localStorage.getItem('allMovies'));
    if (allMoviesArr) {
      setAllMovies(allMoviesArr);
    } else {
      getAllMovies()
        .then(allMovies => getArrayOfAllMovies(allMovies))
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('allMovies');
          setLoadingError('Во время запроса произошла ошибка. '
            + 'Возможно, проблема с соединением или сервер недоступен. '
            + 'Подождите немного и попробуйте ещё раз');
        });
    }

    const saved = JSON.parse(localStorage.getItem('savedMovies'));
    if (saved) {
      setSavedMovies(saved);
    } else {
      getSavedMovies()
        .then(savedMovies => getArrayOfAllMovies(savedMovies))
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('savedMovies');
          setLoadingError('Во время запроса произошла ошибка. '
            + 'Возможно, проблема с соединением или сервер недоступен. '
            + 'Подождите немного и попробуйте ещё раз');
        });;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    setLoggedIn(false);
    setCurrentUser({});
    setAllMovies([]);
    setSavedMovies([]);
    setSearchMovies([]);
    setSearchSavedMovies([]);

    navigate('/');
  };

  const updateUserProfile = ({name, email}) => {
    patchUserData({name, email})
      .then((data) => {
        setCurrentUser(data);
        setEditSuccess(true);
        setEditFailed(false);
        setTimeout(() => {
          setEditSuccess(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setEditFailed(true);
        setTimeout(() => {
          setEditFailed(false);
        }, 3000);
      });
  };

  const putLikeOnCard = (movie) => {
    putLike(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, {...res, id: res.movieId}]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeLikeFromCard = (movie) => {
    const movieId = savedMovies.find((j) => j.id === movie.id)._id;
    removeLike(movieId)
      .then((res) => {
        if (res) {
          const newArray = savedMovies.filter((j) => j.movieId !== res.movieId);
          setSavedMovies(newArray);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const movieAdded = (movie) => savedMovies.some((smov) => smov.id === movie.id);

  const handleLike = (m, Liked) => (Liked ? putLike(m) : removeLike(m));

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__page">
          <Routes>
            <Route path='/' element={
              <>
                <Header theme='' currentUser={currentUser} loggedIn={loggedIn}/>
                <Main/>
                <Footer/>
              </>
            }/>
            <Route path={'/profile'} element={
              <>
                <Header theme='dark' currentUser={currentUser} loggedIn={loggedIn} />
                <ProtectedRoute loggedIn={loggedIn} children={
                  <Profile currentUser={currentUser} logout={logout} editSuccess={editSuccess}
                           updateUserInfo={updateUserProfile}
                           editFailed={editFailed} />
                } />
              </>
            }/>
            <Route path='/movies' element={
              <>
                <Header theme='dark' currentUser={currentUser} loggedIn={loggedIn}/>
                <ProtectedRoute loggedIn={loggedIn} children={<Movies movies={searchMovies}
                                                                      loading={loading}
                                                                      onLikeClick={handleLike}
                                                                      movieAdded={movieAdded}
                                                                      loadingError={loadingError}
                                                                      onSubmitSearch={handleSearch}/>} />
                <Footer/>
              </>
            }/>
            <Route path='/saved-movies' element={
              <>
                <Header theme='dark' currentUser={currentUser} loggedIn={loggedIn}/>
                <ProtectedRoute loggedIn={loggedIn} children={<SavedMovies movies={savedMovies}
                                                                           loading={loading}
                                                                           loadingError={loadingError}
                                                                           onLikeClick={handleLike}/>} />
                <Footer/>
              </>
            }/>
            <Route path="/signin" element={<Login handleSignIn={handleSignIn} signInError={signInError} />} />
            <Route path="/signup" element={<Register handleSignUp={handleSignUp} signUpError={signUpError} />} />
            <Route path="*" element={<BadRequest/>}/>
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
