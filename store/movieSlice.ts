import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface Movie {
  title: string;
  inBasket: boolean;
  liked: boolean;
}

interface MovieState {
  movies: Movie[];
  basket: string[];
  likedMovies: string[];
}

const initialState: MovieState = {
  movies: [
    { title: "The Godfather", inBasket: false, liked: false },
    { title: "The Terminator", inBasket: false, liked: false },
    { title: "The Professianal", inBasket: false, liked: false },
  ],
  basket: [],
  likedMovies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state: MovieState, action: PayloadAction<Movie>) => {
      console.log("addMovie", action.payload);
      state.movies.push(action.payload);
    },
    addToBasket: (state: MovieState, action: PayloadAction<string>) => {
      const movieTitle = action.payload;
      if (state.basket.includes(movieTitle)) {
        state.basket = state.basket.filter((movie) => movie !== movieTitle);
      } else {
        state.basket.push(movieTitle);
      }
      state.movies = state.movies.map((movie) =>
        movie.title === movieTitle
          ? { ...movie, inBasket: !movie.inBasket }
          : movie
      );
    },
    addToLikedMovies: (state: MovieState, action: PayloadAction<string>) => {
      const movieTitle = action.payload;
      if (state.likedMovies.includes(movieTitle)) {
        state.likedMovies = state.likedMovies.filter(
          (movie) => movie !== movieTitle
        );
      } else {
        state.likedMovies.push(movieTitle);
      }
      state.movies = state.movies.map((movie) =>
        movie.title === movieTitle ? { ...movie, liked: !movie.liked } : movie
      );
    },
  },
});

export const selectAllMovies = (state: RootState) => state.movies.movies;
export const selectBasket = (state: RootState) => state.movies.basket;
export const selectLikedMovies = (state: RootState) => state.movies.likedMovies;

export const { addMovie, addToBasket, addToLikedMovies } = movieSlice.actions;

export default movieSlice.reducer;
