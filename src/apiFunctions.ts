import type {Movie, MovieInput} from "./models.ts";


export async function getMovies(url: string): Promise<Movie[]> {
    const response = await fetch(url);

    if (!response.ok) {
        console.error(`HTTP ${response.status}`);
        return [];
    }
    return await response.json();
}

export async function saveMovie(movie: MovieInput, url: string): Promise<Movie | null> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
    });

    if (!response.ok) {
        console.error(`HTTP ${response.status}`);
        return null;
    }

    return await response.json();
}

export async function updateMovie(id: number, movieInput: MovieInput, url: string): Promise<Movie | null> {
    const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movieInput),
    });

    if (!response.ok) {
        console.error(`HTTP ${response.status}`);
        return null;
    }

    return response.json();
}

export async function deleteMovie(id: number, url: string, ): Promise<boolean> {
    const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        console.error(`HTTP ${response.status}`);
        return false;
    }
    return true;
}

