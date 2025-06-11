import axios from "axios";
import type {Movie} from "../types/movie.ts"

const VITE_TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzMyNjlkNWY4ODUzNWQxN2QwZTRlMGIyNmNjNTIxZCIsIm5iZiI6MTc0OTQ0Njg3MC4xNTI5OTk5LCJzdWIiOiI2ODQ2NzBkNjJkODQ5MzA2MTVkZTcyOGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zE8HkhkSUXCcXQX0Xsqij7oCschUMZ2RpAkEP3huiPA";

export interface GetMovie{
  results: Movie[];
}


export async function movieService(query: string): Promise<Movie[]> {

  const response = await axios.get<GetMovie>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: query, // Передаём название фильма
      },
      headers: {
        Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data.results;
}
