interface Props {
    movieId: number;
    onReviewAdded: (review: Review) => void;
}


import { useState } from "react";
import type { Review } from "./models.ts";
import { postReview } from "./apiFunctions.ts";
import { API_URL } from "./config.ts";

interface Props {
    movieId: number;
    onReviewAdded: (review: Review) => void;
}

export default function ReviewForm({ movieId, onReviewAdded }: Props) {
    const [reviewerName, setReviewerName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);

    async function handleSubmit() {
        if (!reviewerName.trim() || !comment.trim()) {
            return;
        }

        const savedReview = await postReview(
            movieId,
            {
                reviewerName,
                comment,
                rating,
            },
            API_URL
        );

        if (!savedReview) {
            return;
        }

        onReviewAdded(savedReview);

        setReviewerName("");
        setComment("");
        setRating(5);
    }

    return (
        <form
            className="mt-4 grid max-w-md gap-2"
            onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <input
                className="border p-2"
                type="text"
                placeholder="Your name"
                value={reviewerName}
                onChange={e => setReviewerName(e.target.value)}
            />

            <textarea
                className="border p-2"
                placeholder="Write a review"
                value={comment}
                onChange={e => setComment(e.target.value)}
            />

            <select
                className="border p-2"
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>

            <button
                className="border p-2 hover:bg-gray-100"
                type="submit"
            >
                Add Review
            </button>
        </form>
    );
}