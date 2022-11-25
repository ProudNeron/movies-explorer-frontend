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
  const [searchMovies, setSearchMovies] = useState(localStorage.getItem('lastSearch')
    ? JSON.parse(localStorage.getItem('lastSearch')) : []);
  const [query, setQuery] = useState(localStorage.getItem('query') ?
    JSON.parse(localStorage.getItem('query')) : '');
  const [filterIsOn, setFilterIsOn] = useState(localStorage.getItem('filterIsOn')
    ? JSON.parse(localStorage.getItem('filterIsOn')) : false);

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
        .then(() => {
          setLoggedIn(true);
          getCurrentUser();
          navigate(path);
        })
        .catch((err) => {
          localStorage.removeItem('token');
          navigate('/');
          console.log(err);
          if (err && err.status === 401) {
            logout();
          }
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
      localStorage.setItem('query', JSON.stringify(searchQuery));
      setQuery(searchQuery);
      const movieArray = extractSearch(allMovies, searchQuery);
      setSearchMovies(movieArray);
      localStorage.setItem('lastSearch', JSON.stringify(movieArray));
      setLoading(false);
    }, 600);
  };

  const getArrayOfSavedMovies = (data) => {
    const savedMoviesData = data.map((j) => {
      return {
        ...j,
        id: j.movieId
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
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([getAllMovies(), getSavedMovies()])
        .then(([allMovies, savedMovies]) => {
          getArrayOfAllMovies(allMovies);
          getArrayOfSavedMovies(savedMovies);
        })
        .catch((err) => {
          if (err && err.status === 401) {
            logout();
          }
          localStorage.removeItem('allMovies');
          localStorage.removeItem('savedMovies');
          setLoadingError('Во время запроса произошла ошибка. '
            + 'Возможно, проблема с соединением или сервер недоступен. '
            + 'Подождите немного и попробуйте ещё раз');
        });
    }
  }, [loggedIn]);



  const logout = () => {
    localStorage.removeItem('allMovies');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('filterIsOn');
    localStorage.removeItem('query');
    localStorage.removeItem('lastSearch')
    setLoggedIn(false);
    setCurrentUser({});
    setAllMovies([]);
    setSavedMovies([]);
    setSearchMovies([]);
    setFilterIsOn(false);
    setQuery('');

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
        if (err && err.status === 401) {
          logout();
        }
      });
  };

  const putLikeOnCard = (movie) => {
    putLike(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, {...res, id: res.movieId}]);
      })
      .catch((err) => {
        console.error(err);
        if (err && err.status === 401) {
          logout();
        }
      });
  };

  const removeLikeOnCard = (movie) => {
    const movieId = savedMovies.find((j) => j.movieId === movie.id)._id;
    removeLike(movieId)
      .then((res) => {
        if (res) {
          const updatedSavedMovies = savedMovies.filter((j) => j._id !== movieId);
          setSavedMovies(updatedSavedMovies);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err && err.status === 401) {
          logout();
        }
      });
  };

  const movieAdded = (movie) => savedMovies.some(smov => smov.movieId === movie.id);

  const handleLike = (m, Liked) => (Liked ? putLikeOnCard(m) : removeLikeOnCard(m));

  const switchFilter = (state) => setFilterIsOn(state);

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
                <Header theme='dark' currentUser={currentUser} loggedIn={loggedIn}/>
                <ProtectedRoute loggedIn={loggedIn} children={
                  <Profile currentUser={currentUser} logout={logout} editSuccess={editSuccess}
                           updateUserInfo={updateUserProfile}
                           editFailed={editFailed}/>
                }/>
              </>
            }/>
            <Route path='/movies' element={
              <>
                <Header theme='dark' currentUser={currentUser} loggedIn={loggedIn}/>
                <ProtectedRoute loggedIn={loggedIn} children={<Movies movies={searchMovies}
                                                                      filterIsOn={filterIsOn}
                                                                      switchFilter={switchFilter}
                                                                      loading={loading}
                                                                      onLikeClick={handleLike}
                                                                      movieAdded={movieAdded}
                                                                      loadingError={loadingError}
                                                                      query={query}
                                                                      onSubmitSearch={handleSearch}/>}/>
                <Footer/>
              </>
            }/>
            <Route path='/saved-movies' element={
              <>
                <Header theme='dark' currentUser={currentUser} loggedIn={loggedIn}/>
                <ProtectedRoute loggedIn={loggedIn} children={<SavedMovies movies={savedMovies}
                                                                           loading={loading}
                                                                           loadingError={loadingError}
                                                                           movieAdded={movieAdded}
                                                                           onLikeClick={handleLike}/>}/>
                <Footer/>
              </>
            }/>
            <Route path="/signin" element={<ProtectedRoute loggedIn={!loggedIn}
                                                           children={<Login handleSignIn={handleSignIn}
                                                                            signInError={signInError}/>}/>}/>
            <Route path="/signup" element={<ProtectedRoute loggedIn={!loggedIn}
                                                           children={<Register handleSignUp={handleSignUp}
                                                                               signUpError={signUpError}/>} />}/>
            <Route path="*" element={<BadRequest/>}/>
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
