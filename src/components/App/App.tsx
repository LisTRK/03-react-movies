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
    const [movieModal, setMovieModal] = useState<Movie>();
    const [totalPage, setTotalPage] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

   

   

    const handelSearch = async (newQuery: string) => {
        try {
            setMovies([]);
            setTotalPage(1);
            setIsLoading(true);
            setIsError(false);
            const featchImage = await fetchMovies(newQuery);
            if (featchImage.results.length === 0) {
                toast.error("No movies found for your request.");
                return
            }
            setMovies(featchImage.results);
            setTotalPage(featchImage.total_pages);
            
        } catch {
            console.log("Error");
            setIsLoading(false)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    };

    const handleSelect = (movie: Movie) => {
        setIsOpenModal(true);
        setMovieModal(movie);
    }


    const onCloseModal = () => {
        setIsOpenModal(false);
    }

    return <div className={css.app}>
        <SearchBar onSearch={handelSearch} />
        <MovieGrid onSelect={handleSelect} movies={movies}  />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {isOpenModal && <MovieModal movie={movieModal } onClose={ onCloseModal} />}
        
        <div><Toaster /></div>
        
    </div>;
        
    
};

export default App;