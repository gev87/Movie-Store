import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
	const [movieTitle, setMovieTitle] = useState("");
	const dispatch = useDispatch();
	const movies = useSelector(state => state.movies);
	const likedMovies = useSelector((state) => state.likedMovies);
	const basket = useSelector((state) => state.basket);



	function handleAddMovie() {
		dispatch({ type: "ADD_MOVIE", payload: movieTitle });
		setMovieTitle("");
	}

	function handleLikeMovie(movie) {
		if (!likedMovies.includes(movie)) dispatch({ type: "LIKE_MOVIE", payload: movie });
	}

	function handleAddToBasket(movie) {
		if (!basket.includes(movie)) dispatch({ type: "ADD_TO_BASKET", payload: movie });
	}

	return (
		<>
			<div>
				<h1>My Movie List</h1>
			</div>
			<div>
				<input
					type="text"
					placeholder="Enter a movie title"
					value={movieTitle}
					onChange={(event) => setMovieTitle(event.target.value)}
				/>
				<button onClick={handleAddMovie}>Add Movie</button>
			</div>
			<h2>My Movies</h2>
			<ul>
				{movies.map((movie, index) => {
					return (
						<li key={index}>
							{movie}
							<button onClick={() => handleAddToBasket(movie)}>Add to Basket</button>
							<button onClick={() => handleLikeMovie(movie)}>Like</button>
						</li>
					);
				})}
			</ul>
			<h2>My Basket {basket.length}</h2>
			<ul>
				{basket.map((movie, index) => {
					return <li key={index}>{movie}</li>
				})}
			</ul>
			<h2>Liked Movies {likedMovies.length}</h2>
			<ul>
				{likedMovies.map((movie, index) => {
					return <li key={index}>{movie}</li>
				})}
			</ul>
		</>
	);
}
