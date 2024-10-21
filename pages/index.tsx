import { AddShoppingCart, Favorite, FavoriteBorder, RemoveShoppingCart } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
	const [movieTitle, setMovieTitle] = useState("");
	const dispatch = useDispatch();
	const movies = useSelector(
		(state: { movies: { title: string; liked: boolean; inBasket: boolean }[] }) => state.movies
	);
	const likedMovies = useSelector((state: { likedMovies: string[] }) => state.likedMovies);
	const basket = useSelector((state: { basket: string[] }) => state.basket);

	function handleAddMovie() {
		const newMovie = {
			title: movieTitle,
			inBasket: false,
			liked: false,
		};
		dispatch({ type: "ADD_MOVIE", payload: newMovie });
		setMovieTitle("");
	}

	function handleLikeMovie(movieTitle: string) {
		dispatch({ type: "ADD_TO_LIKED_MOVIES", payload: movieTitle });
	}

	function handleAddToBasket(movieTitle: string) {
		dispatch({ type: "ADD_TO_BASKET", payload: movieTitle });
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
									startIcon={movie.inBasket ? <RemoveShoppingCart /> : <AddShoppingCart />}
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
