import { Route, Routes } from "react-router";
import Home from "./Home.tsx";
import "./App.css";
import MovieDetails from "./MovieDetails.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
    );
}