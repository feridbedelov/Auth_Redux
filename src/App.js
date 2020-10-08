import React, { useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import { checkAuthState } from "./store/Auth/actions";
import { connect } from "react-redux";

import Logout from "./components/Auth/Logout";
import Home from "./components/HomePage/Home";
import Authenticate from "./components/Auth/Authenticate";
import Movies from "./components/Movies/Movies";
import MovieDetail from "./components/Movies/MovieDetail/MovieDetail";
import MovieForm from "./components/Movies/MovieForm/MovieForm";
import MyMovies from "./components/Movies/MyMovies/MyMovies";
import MovieEdit from "./components/Movies/MovieEdit/MovieEdit";
import { useTranslation } from "react-i18next";

function App({ onTrySignUp, lang, isAuth }) {
  useEffect(() => {
    onTrySignUp();
  }, [onTrySignUp]);

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  console.log("test")
  let routes = (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/auth' component={Authenticate} />
      <Route exact path='/movies' component={Movies} />
      <Route exact path='/movies/:id' component={MovieDetail} />
      <Redirect to='/' />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/auth' component={Authenticate} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/movies' component={Movies} />
        <Route exact path='/movies/:id' component={MovieDetail} />
        <Route exact path='/addMovie' component={MovieForm} />
        <Route exact path='/editMovie/:id' component={MovieEdit} />
        <Route exact path='/myMovies' component={MyMovies} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return routes;
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    lang: state.lang.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTrySignUp: () => dispatch(checkAuthState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
