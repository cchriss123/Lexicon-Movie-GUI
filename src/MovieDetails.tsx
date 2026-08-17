import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Movie } from "./models.ts";
import { getMovieDetails } from "./apiFunctions.ts";
import { API_URL } from "./config.ts";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        if (!id) return;


        getMovieDetails(Number(id), API_URL)
            .then(setMovie)
            .catch(console.error);
    }, [id]);

    if (!movie) {
        return (
            <div className="p-6">
                <Link to="/" className="underline">
                    ← Back to movies
                </Link>

                <p className="mt-4">Movie not found.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <Link to="/" className="underline">
                ← Back to movies
            </Link>
            <pre>{JSON.stringify(movie, null, 2)}</pre>
        </div>
    );
}