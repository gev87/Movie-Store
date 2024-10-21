import { createStore } from "redux";
type Movie = {
	title: string;
	inBasket: boolean;
	liked: boolean;
};

type State = {
	movies: Movie[];
	basket: string[];
	likedMovies: string[];
};

type Action =
	| { type: "ADD_MOVIE"; payload: Movie }
	| { type: "ADD_TO_BASKET" | "ADD_TO_LIKED_MOVIES"; payload: string };

const initialState = {
	movies: [
		{ title: "The Godfather", inBasket: false, liked: false },
		{ title: "The Terminator", inBasket: false, liked: false },
		{ title: "The Professianal", inBasket: false, liked: false },
	],
	basket: [],
	likedMovies: [],
};

function reducer(state: State = initialState, action: Action): State {
	switch (action.type) {
		case "ADD_MOVIE":
			return {
				...state,
				movies: [...state.movies, action.payload],
			};
		case "ADD_TO_BASKET":
			return {
				...state,
				basket: state.basket.includes(action.payload)
					? state.basket.filter((movie) => movie !== action.payload)
					: [...state.basket, action.payload],
				movies: state.movies.map((movie) =>
					movie.title === action.payload ? { ...movie, inBasket: !movie.inBasket } : movie
				),
			};
		case "ADD_TO_LIKED_MOVIES": {
			return {
				...state,
				likedMovies: state.likedMovies.includes(action.payload)
					? state.likedMovies.filter((movie) => movie !== action.payload)
					: [...state.likedMovies, action.payload],
				movies: state.movies.map((movie) =>
					movie.title === action.payload ? { ...movie, liked: !movie.liked } : movie
				),
			};
		}
		default:
			return state;
	}
}

const store = createStore(reducer);

export default store;
