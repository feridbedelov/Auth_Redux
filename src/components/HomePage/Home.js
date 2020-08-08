import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
// import Carousel from "@brainhubeu/react-carousel";
// import "@brainhubeu/react-carousel/lib/style.css";
import { connect } from "react-redux";
import { changeLang } from "../../store/Language/langActions";
import { motion } from "framer-motion"


// import MovieCarousel from "../Movies/MovieCarousel/MovieCarousel";
import { useTranslation } from "react-i18next";



function Home(props) {


  const { t } = useTranslation();



  const onLangChange = (e) => {
    e.preventDefault()
    props.changeLanguage(e.target.value)
  }

  

  return (
    <div className='hero'>
      <div className='overlay'></div>
      <header className='header'>
        <div className='logo'>aurora.</div>
        <ul className='nav-list'>
          <li className='nav-item'>
            <select className="custom-select" value={props.lang} onChange={onLangChange}>
              <option value={"az"}>AZ</option>
              <option value={"en"}>EN</option>
              <option value={"es"}>ES</option>
            </select>
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
        <motion.h1
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          transition={{ type: "spring", delay: 0.5 }}

        >{t("slogan")}</motion.h1>
        <p>Check out best movies that We have selected for you</p>
        <Link to='/movies' className='ui large button'>
          {" "}
          {t("discover")}
        </Link>
      </div>

      {/* <div className='movies-carousel'>
        <Carousel
          autoPlay={2000}
          animationSpeed={1000}
          infinite
          slidesPerPage={6}
        >
          {movies}
        </Carousel>
      </div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    lang: state.lang.lang
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (code) => dispatch(changeLang(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
