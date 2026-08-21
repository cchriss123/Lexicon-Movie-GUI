import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Movie } from "./models.ts";
import { getMovieDetails } from "./apiFunctions.ts";
import { API_URL } from "./config.ts";
import ReviewForm from "./ReviewForm.tsx";

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
        <>
            <h1 className="text-4xl text-center p-8">
                Movie Details
            </h1>

            <main className="w-5/6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

                    <div className="p-6">
                        <div className="border p-3 grid grid-cols-2 gap-4 items-start max-h-200 overflow-y-auto">

                            <div>
                                <h2 className="text-xl font-bold ">
                                    {movie.title}
                                </h2>

                                <div className="mt-3 grid gap-2 overflow-y-auto ">
                                    <div>Genre: {movie.genre}</div>
                                    <div>Year: {movie.year}</div>
                                    <div>Duration: {movie.duration}</div>
                                    <div>Language: {movie.language}</div>
                                    <div>Budget: {movie.budget}</div>
                                    <div>Synopsis: {movie.synopsis}</div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">
                                    Reviews
                                </h2>

                                <div className="mt-3 grid gap-2 overflow-y-auto">
                                    {movie.reviews.length === 0 ? (
                                        <p>No reviews yet.</p>
                                    ) : (
                                        movie.reviews.map(review => (
                                            <div
                                                key={review.id}
                                                className="border p-2"
                                            >
                                                <div>
                                                    Reviewer: {review.reviewerName}
                                                </div>

                                                <div>
                                                    Rating: {review.rating}
                                                </div>

                                                <div>
                                                    {review.comment}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    <ReviewForm
                        movieId={movie.id}
                        onReviewAdded={review =>
                            setMovie(current =>
                                current
                                    ? {
                                        ...current,
                                        reviews: [
                                            ...current.reviews,
                                            review
                                        ]
                                    }
                                    : current
                            )
                        }
                    />

                </div>

                <div className="px-6">
                    <Link to="/" className="underline">
                        ← Back to movies
                    </Link>
                </div>
            </main>
        </>
    );
}

