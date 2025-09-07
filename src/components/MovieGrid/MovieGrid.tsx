import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridType {
    onSelect: (movie: Movie) => void,
    movies: Movie[]
}

const MovieGrid = ({ onSelect, movies }: MovieGridType) => {

    const handleClick = (movie: Movie) => {
        onSelect(movie);
    };
  

    return <ul className={css.grid}>
        {/* Набір елементів списку з фільмами */}

        {
            movies.map((movie) =>
                <li key={movie.id} onClick={()=>{handleClick(movie)}}>
                    <div className={css.card}>
                        <img
                            className={css.image}
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            loading="lazy"
                        />
                        <h2 className={css.title}>{movie.title}</h2>
                    </div>
                </li>)
        }

        
    </ul>
};

export default MovieGrid;