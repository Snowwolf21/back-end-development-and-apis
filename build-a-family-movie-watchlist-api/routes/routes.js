
import express from "express";
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie
} from "../utils/db.js";
import { authorizeModification } from "../middleware/authorize.js";

const router = express.Router();

// GET /api/watchlist/12
router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const watchlist = getWatchlist(userId);

  if (watchlist === null) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(watchlist);
});


// POST /api/watchlist/12/movies
router.post("/:userId/movies", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movie = addMovie(userId, req.body);

  if (movie === null) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(201).json(movie);
});

// PUT /api/watchlist/12/movies/3
router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  const updatedMovie = updateMovie(userId, movieId, req.body);

  if (updatedMovie === null) {
    return res.status(404).json({ error: "User or movie not found" });
  }

  return res.status(200).json(updatedMovie);
});

// DELETE /api/watchlist/12/movies/3
router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  const deleted = deleteMovie(userId, movieId);

  if (!deleted) {
    return res.status(404).json({ error: "User or movie not found" });
  }

  return res.status(200).json({ message: "Movie deleted" });
});

export default router;

