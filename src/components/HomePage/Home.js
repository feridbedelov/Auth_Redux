import React, { useEffect } from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import Carousel , {Dots}  from "@brainhubeu/react-carousel"
import '@brainhubeu/react-carousel/lib/style.css'; 
import { connect } from 'react-redux';
import { fetchMovies } from '../../store/Movies/actions';
import MovieCarousel from '../Movies/MovieCarousel/MovieCarousel';


function Home(props) {

    useEffect(()=>{
        props.loadMovies();
    },[])


    let movies = null
    if(props.movies){
        movies = props.movies.map(movie => {
            return (
                <MovieCarousel key={movie.id} movie={movie} />
            )
        } )
    }


    return (
        <div className="hero">
            <div className="overlay"></div>
            <header className="header">
                <div className="logo">aurora.</div>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/movies" className = "nav-link movies-link" >
                            MOVIES
                        </Link>
                    </li>
                    <li className="nav-item">
                        {props.isAuth ? (<Link to="/logout" className="nav-link auth-1 ">
                            Log Out
                        </Link>): (<Link to = "/auth" className = "nav-link auth-1 ">
                            Sign Up
                        </Link>) }
                        
                        
                    </li>
                </ul>
            </header>

            <div className="social-links">
                <div className="social-link-twitter ">
                    <a href="https://twitter.com/" target="_blank">Twitter</a>
                </div> 
                <div className="social-link-instagram ">
                    <a href="https://instagram.com/" target="_blank">Instagram</a>
                </div>   
            </div>
            
            

            

            <div className="showcase-text"> 
                <h1>IN MOVIES WE TRUST</h1>
                <p>Check out best movies that We have selected for you</p>
                <Link to="/movies" className="ui large button"> Discover </Link>
            </div>

            <div className = "movies-carousel">
                <Carousel
                    autoPlay={2000}
                    animationSpeed={1000}
                    infinite
                    slidesPerPage={6}>
                   
                        {movies}
                </Carousel>
            </div>
            

        </div>
        
    )
}


const mapStateToProps = (state) => {
    return {
        movies: state.movie.movies,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMovies: () => dispatch(fetchMovies())
    }
}



export default connect(mapStateToProps,mapDispatchToProps)( Home)
