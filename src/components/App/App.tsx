import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css'
import type { Movie } from '../../types/movie';
import fetchMovies from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

 

const App = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [movieModal, setMovieModal] = useState<Movie|null>();
    const [totalPage, setTotalPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

   

    console.log("totalPage: ", totalPage);
    
   

    const handelSearch = async (newQuery: string) => {
        try {
            setMovies([]);
            setTotalPage(1);
            setIsLoading(true);
            setIsError(false);
            const featchMoviesValue = await fetchMovies(newQuery);
            if (featchMoviesValue.results.length === 0) {
                toast.error("No movies found for your request.");
                return
            }
            setMovies(featchMoviesValue.results);
            setTotalPage(featchMoviesValue.total_pages);
            
        } catch {
            console.log("Error");
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    };

    const handleSelect = (movie: Movie) => {
        setMovieModal(movie);
    }


    const onCloseModal = () => {
        setMovieModal(null);
    }

    return <div className={css.app}>
        <SearchBar onSubmit={handelSearch} />
        <MovieGrid onSelect={handleSelect} movies={movies}  />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {movieModal && <MovieModal movie={movieModal } onClose={ onCloseModal} />}
        
        <div><Toaster /></div>
        
    </div>;
        
    
};

export default App;