import {Routes, Route} from "react-router-dom";
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from "../Register/Register.js";
import BadRequest from "../BadRequest/BadRequest.js";
import Profile from "../Profile/Profile.js";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className="app">
      <div className="app__page">
        <Routes>
          <Route path='/' element={
            <>
              <Header theme='' isLoggedIn={false}/>
              <Main/>
              <Footer/>
            </>
          }/>
          <Route path={'/profile'} element={
            <>
              <Header theme='dark' isLoggedIn={true}/>
              <Profile/>
            </>
          }/>
          <Route path='/movies' element={
            <>
              <Header theme='dark' isLoggedIn={true}/>
              <Movies />
              <Footer />
            </>
          }/>
          <Route path='/saved-movies' element={
            <>
              <Header theme='dark' isLoggedIn={true}/>
              <SavedMovies />
              <Footer />
            </>
          }/>
          <Route path="/signin" element={<Login/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="*" element={<BadRequest/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
