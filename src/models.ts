export interface Movie {
    id: number;
    title: string;
    genre: string;
    year: number;
    duration: string;
    movieDetails: MovieDetail | null;
    reviews: Review[];
    actors: Actor[];
}

export interface MovieInput {
    title: string;
    genre: string;
    year: number;
    duration: string;
}


export interface Actor {
    id: number;
    name: string;
    birthYear: number;
    movies: Movie[];
}

export interface MovieDetail {
    id: number;
    synopsis: string | null;
    language: string;
    budget: string | null;
}

export interface Review {
    id: number;
    reviewerName: string;
    comment: string | null;
    rating: number;
}

