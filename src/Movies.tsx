import { Link } from "react-router";
import type { Movie } from "./models.ts";

interface Props {
    movies: Movie[];
    movieToEdit: Movie | null;
    onEdit: (movie: Movie | null) => void;
    onDelete: (movie: Movie) => void;
}

export default function Movies(props : Props) {



    function toggleSetMovieToEdit(movie: Movie) {
        props.onEdit(props.movieToEdit?.id === movie.id ? null : movie);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 p-6">
            {props.movies.map(movie => (
                <div key={movie.id} className="border p-3 flex flex-col">
                    <Link
                        to={`/movies/${movie.id}`}
                        className="hover:underline"
                    >
                        <h2 className="text-xl font-bold">
                            {movie.title}
                        </h2>
                    </Link>

                    <div>Genre: {movie.genre}</div>
                    <div>Year: {movie.year}</div>
                    <div>Duration: {movie.duration}</div>

                    <div className="flex justify-evenly mt-auto pt-3">
                        <button
                            className={
                                props.movieToEdit?.id === movie.id
                                    ? "border p-2 font-bold bg-gray-100 w-2/5 hover:bg-gray-200"
                                    : "border p-2 w-2/5 hover:bg-gray-100"
                            }
                            type="button"
                            onClick={() => toggleSetMovieToEdit(movie)}
                        >
                            {props.movieToEdit?.id === movie.id ? "Editing" : "Edit"}
                        </button>

                        <button
                            className="border p-2 w-2/5 hover:bg-gray-100"
                            type="button"
                            onClick={() => props.onDelete(movie)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );


}