import React, { useEffect } from 'react';
import Authenticate from './components/Auth/Authenticate';
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
import NotFound from './components/Errors/NotFound';
import Navbar from './components/Layout/Navbar';
import Logout from './components/Auth/Logout';
import Home from './components/HomePage/Home';
import { checkAuthState } from './store/Auth/actions';
import { connect } from 'react-redux';
import Movies from './components/Movies/Movies';


function App(props) {

  useEffect(()=>{
    props.onTrySignUp();
  },[])

  let routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={Authenticate} />
      <Route exact path="/movies" component={Movies} />
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
