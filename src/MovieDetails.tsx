import { Link, useParams } from "react-router";

export default function MovieDetails() {
    const { id } = useParams();

    return (
        <div className="p-6">
            <Link to="/" className="underline">
                ← Back to movies
            </Link>

            <h1 className="text-2xl font-bold mt-4">Movie Details</h1>
            <p>Movie ID: {id}</p>
        </div>
    );
}