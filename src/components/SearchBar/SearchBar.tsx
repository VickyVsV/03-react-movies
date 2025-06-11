import styles from "./SearchBar.module.css";
import { toast } from "react-hot-toast";
/* import { Movie } from "../../types/movie.ts";
import toast, { toast } from "react-hot-toast"; */

interface SearchBarProps {
  onSubmit : (movie: string) => void; // movie — строка из input
}

export default function SearchBar({onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const valueInput = formData.get("query") as string;
    // Якщо текстове поле порожнє, виводимо повідомлення 
		// і припиняємо виконання функції.
    if (valueInput === "") {
      toast.error("Please enter your search query.");
      return;
    }
    
    // У протилежному випадку викликаємо пропс 
		// і передаємо йому значення поля
    onSubmit(valueInput);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
