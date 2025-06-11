import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import { movieService } from "../../services/movieService.ts";
import { toast, Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie.ts";
import { useState} from "react";

export default function App() {
  // 1. Оголошуємо і типізуємо стан
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false); // 1. Додаємо стан індикатора завантаження
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  
  const handleSearch = async (newMovie: string) => {
    try {
      setIsLoading(true); // 2. змінюємо індикатор на true перед запитом
      setIsError(false);
      setMovies([]);
      // Тут будемо виконувати HTTP-запит
      const response = await movieService(newMovie);
     /*  setIsLoading(false); */ // 3. Змінюємо індикатор на false після запиту
      setMovies(response);

      if (response.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false); // 5. Встановлюємо стан isLoading в false після будь якого результату запиту
    }
  };

  return (
    <>
      <div className={css.app}>
        <SearchBar onSubmit={handleSearch} />
        <Toaster />
        {isLoading ? (
          <Loader />
        ) : (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )}
        {isModalOpen && selectedMovie && (
          <MovieModal onClose={closeModal} movie={selectedMovie} />
        )}
        {isError && <ErrorMessage />}
      </div>
    </>
  );
}
