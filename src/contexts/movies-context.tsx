import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
};

type MovieContextData = {
  favoriteMovies: number[];
  allFavoriteMovies: Movie[];
  handleAddFavoriteMovie: (movieId: number) => void;
  handleDeleteFavoriteMovie: (movieId: number) => void;
};

type MovieProviderProps = {
  children: ReactNode;
};

export const MovieContext = createContext<MovieContextData>(
  {} as MovieContextData
);

export function MovieProvider({ children }: MovieProviderProps) {
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
  const [allFavoriteMovies, setAllFavoriteMovies] = useState<Movie[]>([]);

  async function handleAddFavoriteMovie(movieId: number) {
    if (!favoriteMovies.includes(movieId)) {
      const newFavoriteMovies = [...favoriteMovies, movieId];
      setFavoriteMovies(newFavoriteMovies);
      await AsyncStorage.setItem(
        "favoriteMovies",
        JSON.stringify(newFavoriteMovies)
      );
    }
  }

  async function handleDeleteFavoriteMovie(movieId: number) {
    if (favoriteMovies.includes(movieId)) {
      const newFavoriteMovies = favoriteMovies.filter(
        (id: number) => id !== movieId
      );
      setFavoriteMovies(newFavoriteMovies);
      await AsyncStorage.setItem(
        "favoriteMovies",
        JSON.stringify(newFavoriteMovies)
      );
    }
  }

  useEffect(() => {
    async function getFavoriteMovies() {
      const favoriteMoviesStorage = await AsyncStorage.getItem(
        "favoriteMovies"
      );
      if (favoriteMoviesStorage) {
        setFavoriteMovies(JSON.parse(favoriteMoviesStorage));
      }
    }
  }, []);

  const contextData: MovieContextData = {
    favoriteMovies,
    allFavoriteMovies,
    handleAddFavoriteMovie,
    handleDeleteFavoriteMovie,
  };

  return (
    <MovieContext.Provider value={contextData}>
      {children}
    </MovieContext.Provider>
  );
}
