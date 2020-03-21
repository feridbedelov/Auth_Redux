import React, { useEffect } from 'react';
import Authenticate from './components/Auth/Authenticate';
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
import Navbar from './components/Layout/Navbar';
import Logout from './components/Auth/Logout';
import Home from './components/HomePage/Home';
import { checkAuthState } from './store/Auth/actions';
import { connect } from 'react-redux';
import Movies from './components/Movies/Movies';
import MovieDetail from './components/Movies/MovieDetail/MovieDetail';
import MovieForm from './components/Movies/MovieForm/MovieForm';


function App(props) {

  useEffect(()=>{
    props.onTrySignUp();
  },[])

  let routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={Authenticate} />
      <Route exact path="/movies" component={Movies} />
      <Route exact path="/movies/:id" component={MovieDetail} />
      <Redirect to="/" />
    </ Switch>
  )

  if(props.isAuth){
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Authenticate} />
        <Route exact path = "/logout" component = {Logout} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/movies/:id" component={MovieDetail} />
        <Route exact path="/addMovie" component={MovieForm} />
        <Route exact path="/editMovie/:id" component={MovieForm} />
        <Redirect to="/" />
      </ Switch>
    )
  }


  return (
    
      <div className="">
        <Navbar />
        {routes}
      </div>
   
  );
}


const mapStateToProps = state => {
  return {
    isAuth : state.auth.token !== null
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onTrySignUp: () => dispatch(checkAuthState())
  }
} 

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
