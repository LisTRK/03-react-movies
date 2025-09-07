import axios from "axios";
import type { Movie } from "../types/movie";
import getToken from "./getToken";

interface FetchMoviesType {
        results: Movie[],
        total_pages: number,
};
    
axios.defaults.baseURL = `https://api.themoviedb.org/3/`;


 


const fetchMovies = async (newSearch: string): Promise<FetchMoviesType> => {
  // const VITE_TMDB_TOKEN: string = import.meta.env.VITE_TMDB_TOKEN;
  const VITE_TMDB_TOKEN: string = getToken();
  

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${VITE_TMDB_TOKEN}`
  }
  };
  
  const url = `search/movie?query=${newSearch}&include_adult=false&language=en-US&page=1`;
   

  const responce = await axios.get<FetchMoviesType>(url, options);
 
 
  return responce.data;
 };



 
export default fetchMovies;