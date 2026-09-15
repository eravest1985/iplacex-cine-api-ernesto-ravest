import express from "express";
import controller from "./controller.js";

const peliculaRoutes = express.Router();

peliculaRoutes.post(
  "/pelicula",
  controller.handleInsertPeliculaRequest
);

peliculaRoutes.get(
  "/peliculas",
  controller.handleGetPeliculasRequest
);

peliculaRoutes.get(
  "/película/:id",
  controller.handleGetPeliculaByIdRequest
);

peliculaRoutes.get(
  "/pelicula/:id",
  controller.handleGetPeliculaByIdRequest
);

peliculaRoutes.put(
  "/película/:id",
  controller.handleUpdatePeliculaByIdRequest
);

peliculaRoutes.put(
  "/pelicula/:id",
  controller.handleUpdatePeliculaByIdRequest
);

peliculaRoutes.delete(
  "/película/:id",
  controller.handleDeletePeliculaByIdRequest
);

peliculaRoutes.delete(
  "/pelicula/:id",
  controller.handleDeletePeliculaByIdRequest
);

export default peliculaRoutes;