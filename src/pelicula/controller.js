import { ObjectId } from "mongodb";
import { Pelicula } from "./pelicula.js";
import client from "../common/db.js";

const peliculaCollection = client.db("cine-db").collection("peliculas");

async function handleInsertPeliculaRequest(req, res) {
  const body = req.body;

  const pelicula = { ...Pelicula };

  delete pelicula._id;

  pelicula.nombre = body.nombre;
  pelicula.géneros = body.géneros;
  pelicula.anioEstreno = body.anioEstreno;

  await peliculaCollection.insertOne(pelicula)
    .then((data) => {
      if (data === null) {
        return res.status(500).json({
          message: "No se pudo insertar la película"
        });
      }

      return res.status(201).json(data);
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Error al insertar la película",
        error: e.message
      });
    });
}

async function handleGetPeliculasRequest(req, res) {
  await peliculaCollection.find().toArray()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Error al obtener las películas",
        error: e.message
      });
    });
}

async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const oid = ObjectId.createFromHexString(req.params.id);

    await peliculaCollection.findOne({ _id: oid })
      .then((data) => {
        if (data === null) {
          return res.status(404).json({
            message: "Película no encontrada"
          });
        }

        return res.status(200).json(data);
      })
      .catch((e) => {
        return res.status(500).json({
          message: "Error al obtener la película",
          error: e.message
        });
      });
  } catch (e) {
    return res.status(500).json({
      message: "Id mal formado",
      error: e.message
    });
  }
}

async function handleUpdatePeliculaByIdRequest(req, res) {
  try {
    const oid = ObjectId.createFromHexString(req.params.id);
    const body = req.body;

    const query = {
      $set: {
        nombre: body.nombre,
        géneros: body.géneros,
        anioEstreno: body.anioEstreno
      }
    };

    await peliculaCollection.updateOne(
      { _id: oid },
      query
    )
      .then((data) => {
        if (data.modifiedCount === 0) {
          return res.status(404).json({
            message: "Película no encontrada o sin modificaciones"
          });
        }

        return res.status(200).json(data);
      })
      .catch((e) => {
        return res.status(500).json({
          message: "Error al actualizar la película",
          error: e.message
        });
      });
  } catch (e) {
    return res.status(500).json({
      message: "Id mal formado",
      error: e.message
    });
  }
}

async function handleDeletePeliculaByIdRequest(req, res) {
  try {
    const oid = ObjectId.createFromHexString(req.params.id);

    await peliculaCollection.deleteOne({ _id: oid })
      .then((data) => {
        if (data.deletedCount === 0) {
          return res.status(404).json({
            message: "Película no encontrada"
          });
        }

        return res.status(200).json(data);
      })
      .catch((e) => {
        return res.status(500).json({
          message: "Error al eliminar la película",
          error: e.message
        });
      });
  } catch (e) {
    return res.status(500).json({
      message: "Id mal formado",
      error: e.message
    });
  }
}

export default {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest
};