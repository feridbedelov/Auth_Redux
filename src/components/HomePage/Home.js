import React, { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { connect } from "react-redux";
import { fetchMovies } from "../../store/Movies/actions";
import { changeLang } from "../../store/Language/langActions";

import MovieCarousel from "../Movies/MovieCarousel/MovieCarousel";
import { useTranslation } from "react-i18next";

function Home(props) {
  useEffect(() => {
    props.loadMovies();
  }, []);

  const { t } = useTranslation();

  

  let movies = null;
  if (props.movies) {
    movies = props.movies.map((movie) => {
      return <MovieCarousel key={movie.id} movie={movie} />;
    });
  }

  return (
    <div className='hero'>
      <div className='overlay'></div>
      <header className='header'>
        <div className='logo'>aurora.</div>
        <ul className='nav-list'>
          <li className='nav-item'>
            <div className = "custom-select">
              <button onClick={() => props.changeLanguage("az")} type='button'>
                AZ
              </button>
              <button onClick={() => props.changeLanguage("en")} type='button'>
                EN
              </button>
              <button onClick={() => props.changeLanguage("es")} type='button'>
                ES
              </button>
            </div>
          </li>

          <li className='nav-item'>
            <Link to='/movies' className='nav-link movies-link'>
              MOVIES
            </Link>
          </li>
          <li className='nav-item'>
            {props.isAuth ? (
              <Link to='/logout' className='nav-link auth-1 '>
                Log Out
              </Link>
            ) : (
              <Link to='/auth' className='nav-link auth-1 '>
                Sign Up
              </Link>
            )}
          </li>
        </ul>
      </header>

      <div className='social-links'>
        <div className='social-link-twitter '>
          <a href='https://twitter.com/' target='_blank'>
            Twitter
          </a>
        </div>
        <div className='social-link-instagram '>
          <a href='https://instagram.com/' target='_blank'>
            Instagram
          </a>
        </div>
      </div>

      <div className='showcase-text'>
        <h1>{t("slogan")}</h1>
        <p>Check out best movies that We have selected for you</p>
        <Link to='/movies' className='ui large button'>
          {" "}
          {t("discover")}
        </Link>
      </div>

      <div className='movies-carousel'>
        <Carousel
          autoPlay={2000}
          animationSpeed={1000}
          infinite
          slidesPerPage={6}
        >
          {movies}
        </Carousel>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMovies: () => dispatch(fetchMovies()),
    changeLanguage : (code) => dispatch(changeLang(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
