import Movies from "./Movies.tsx";
import MovieForm from "./MovieForm.tsx";
import { deleteMovie, getMovies } from "./apiFunctions.ts";
import { useEffect, useState } from "react";
import type { Movie } from "./models.ts";
import { API_URL } from "./config.ts";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

    useEffect(() => {
        getMovies(API_URL)
            .then(setMovies)
            .catch(console.error);
    }, []);

    async function handleDeleteMovie(movie: Movie) {
        const isDeleted = await deleteMovie(movie.id, API_URL);

        if (!isDeleted) {
            console.warn("Something went wrong when deleting movie", movie);
            return;
        }

        setMovies(current =>
            current.filter(m => m.id !== movie.id)
        );
    }

    return (
        <>

            <h1 className="text-4xl text-center p-8">
                Movie App
            </h1>

            <main className="w-5/6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Movies
                        movies={movies}
                        movieToEdit={movieToEdit}
                        onEdit={setMovieToEdit}
                        onDelete={handleDeleteMovie}
                    />

                    <MovieForm
                        key={movieToEdit?.id ?? "add"}
                        movieToEdit={movieToEdit}
                        onMovieAdded={movie =>
                            setMovies(current => [...current, movie])
                        }
                        onMovieUpdated={movie => {
                            setMovies(current =>
                                current.map(m =>
                                    m.id === movie.id ? movie : m
                                )
                            );

                            setMovieToEdit(null);
                        }}
                    />
                </div>
            </main>
        </>
    );
}