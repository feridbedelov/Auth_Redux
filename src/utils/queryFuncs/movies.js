import Axios from "axios"

export const fetchMovies = async () => {
    const res = await Axios.get("http://localhost:3000/movies");
    return res.data
}

export const fetchMovie = async (key, id=1) => {
    const res = await Axios.get(`http://localhost:3000/movies/${id}`);
    return res.data
}

export const removeMovie = async (id) => {
    try {
        await Axios.delete(`http://localhost:3000/movies/${id}`);
    } catch (error) {
        console.log(error)
    }

}

export const fetchMyMovies = async (key, userId) => {
    const res = await Axios.get("http://localhost:3000/movies?userId=" + userId);
    return res.data
}