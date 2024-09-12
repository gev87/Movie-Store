import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function Home() {
	const [movieTitle, setMovieTitle] = useState("");
	return (
		<>
			<div>
				<h1>My Movie List</h1>
			</div>
			<input
				type="text"
				placeholder="Enter a movie title"
				// value={}
				onChange={(event) => setMovieTitle(event.target.value)}
			/>
		</>
	);
}
