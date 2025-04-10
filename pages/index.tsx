import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  addMovie,
  addToBasket,
  addToLikedMovies,
  selectAllMovies,
  selectBasket,
  selectLikedMovies,
} from "@/store/movieSlice";
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  RemoveShoppingCart,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export default function Home() {
  const [movieTitle, setMovieTitle] = useState("");
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectAllMovies);

  const likedMovies = useAppSelector(selectLikedMovies);
  const basket = useAppSelector(selectBasket);

  function handleAddMovie() {
    const newMovie = {
      title: movieTitle,
      inBasket: false,
      liked: false,
    };
    dispatch(addMovie(newMovie));
    setMovieTitle("");
  }

  function handleLikeMovie(movieTitle: string) {
    dispatch(addToLikedMovies(movieTitle));
  }

  function handleAddToBasket(movieTitle: string) {
    dispatch(addToBasket(movieTitle));
  }

  return (
    <div className="container">
      <div>
        <h1>My Movie List</h1>
      </div>
      <div className="add-movie">
        <input
          type="text"
          placeholder="Enter a movie title"
          value={movieTitle}
          onChange={(event) => setMovieTitle(event.target.value)}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      <h2>My Movies</h2>
      <ul className="movie-list">
        {movies.map((movie, index) => {
          return (
            <Card key={index} className="movie-card">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {movie.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => handleAddToBasket(movie.title)}
                  startIcon={
                    movie.inBasket ? (
                      <RemoveShoppingCart />
                    ) : (
                      <AddShoppingCart />
                    )
                  }
                >
                  {movie.inBasket ? "Remove from Basket" : "Add to Basket"}
                </Button>
                <Button
                  startIcon={movie.liked ? <Favorite /> : <FavoriteBorder />}
                  onClick={() => handleLikeMovie(movie.title)}
                >
                  {movie.liked ? "unlike" : "Like"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </ul>
      <h2>My Basket {basket.length}</h2>
      <ul>
        {basket.map((movie, index) => {
          return <li key={index}>{movie}</li>;
        })}
      </ul>
      <h2>Liked Movies {likedMovies.length}</h2>
      <ul>
        {likedMovies.map((movie, index) => {
          return <li key={index}>{movie}</li>;
        })}
      </ul>
    </div>
  );
}
