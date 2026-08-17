import type { Movie, MovieInput } from "./models.ts";
import { useState} from "react";
import {saveMovie, updateMovie} from "./apiFunctions.ts";
import { API_URL } from "./config.ts";

interface Props {
    onMovieAdded: (movie: Movie) => void;
    onMovieUpdated: (movie: Movie) => void;
    movieToEdit: Movie | null;
}

export default function MovieForm({ onMovieAdded, movieToEdit, onMovieUpdated }: Props) {


    const [movieInput, setMovieInput] = useState<MovieInput>({
        title: movieToEdit?.title ?? "",
        genre: movieToEdit?.genre ?? "",
        year: movieToEdit?.year ?? 0,
        duration: movieToEdit?.duration ?? "",
    });


    const [error, setError] = useState("");

    async function handleSubmit(input: MovieInput) {

        setError("");

        if (
            !input.title.trim() ||
            !input.genre.trim() ||
            !input.year ||
            !input.duration.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }


        if (!movieToEdit){
            await handleAddSubmit(input)
        } else {
            await handleUpdateSubmit(movieToEdit, input);
        }

    }



    async function handleUpdateSubmit(movie: Movie, input: MovieInput) {


        try {
            const updatedMovie = await updateMovie(
                movie.id,
                input,
                API_URL
            );

            if (!updatedMovie) {
                setError("Could not update the movie.");
                return;
            }

            onMovieUpdated(updatedMovie);

            setMovieInput({
                title: "",
                genre: "",
                year: 0,
                duration: "",
            });




        } catch (error) {
            console.error(error);
            setError("Something went wrong while updating the movie.");
        }
    }
    async function handleAddSubmit(input: MovieInput){

        try {
            const savedMovie = await saveMovie(input, API_URL);

            if (!savedMovie) {
                setError("Could not save the movie.");
                return;
            }

            onMovieAdded(savedMovie);

            setMovieInput({
                title: "",
                genre: "",
                year: 0,
                duration: "",
            });
        } catch (error) {
            console.error(error);
            setError("Something went wrong while saving the movie.");
        }

    }


    return (
        <div className="p-6">
            <form
                className="border p-3"
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit(movieInput);
                }}
            >
                <h2 className="text-xl font-bold">Add Movie</h2>

                {error && (
                    <p className="mt-2 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <div className="mt-3 grid gap-2">
                    <input
                        className="border p-2"
                        type="text"
                        placeholder="Title"
                        value={movieInput.title}
                        onChange={e =>
                            setMovieInput({
                                ...movieInput,
                                title: e.target.value,
                            })
                        }
                    />

                    <input
                        className="border p-2"
                        type="text"
                        placeholder="Genre"
                        value={movieInput.genre}
                        onChange={e =>
                            setMovieInput({
                                ...movieInput,
                                genre: e.target.value,
                            })
                        }
                    />

                    <input
                        className="border p-2"
                        type="number"
                        placeholder="Year"
                        value={movieInput.year || ""}
                        onChange={e =>
                            setMovieInput({
                                ...movieInput,
                                year: Number(e.target.value),
                            })
                        }
                    />

                    <input
                        className="border p-2"
                        type="text"
                        placeholder="Duration"
                        value={movieInput.duration}
                        onChange={e =>
                            setMovieInput({
                                ...movieInput,
                                duration: e.target.value,
                            })
                        }
                    />

                    <button
                        className="border p-2 font-bold hover:bg-gray-100"
                        type="submit"
                    >
                        {movieToEdit ? "Update Movie" : "Add Movie"}
                    </button>
                </div>
            </form>
        </div>
    );
}