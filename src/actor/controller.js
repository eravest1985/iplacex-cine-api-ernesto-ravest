import { ObjectId } from "mongodb";
import { Actor } from "./actor.js";
import client from "../common/db.js";

const actorCollection = client.db("cine-db").collection("actores");
const peliculaCollection = client.db("cine-db").collection("peliculas");

async function handleInsertActorRequest(req, res) {
  const body = req.body;

  await peliculaCollection.findOne({
    nombre: body.nombrePelicula
  })
    .then(async (pelicula) => {
      if (pelicula === null) {
        return res.status(404).json({
          message: "Película no encontrada"
        });
      }

      const actor = { ...Actor };

      delete actor._id;

      actor.idPelicula = pelicula._id.toString();
      actor.nombre = body.nombre;
      actor.edad = body.edad;
      actor.estaRetirado = body.estaRetirado;
      actor.premios = body.premios;

      await actorCollection.insertOne(actor)
        .then((data) => {
          if (data === null) {
            return res.status(500).json({
              message: "No se pudo insertar el actor"
            });
          }

          return res.status(201).json(data);
        })
        .catch((e) => {
          return res.status(500).json({
            message: "Error al insertar el actor",
            error: e.message
          });
        });
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Error al validar la película",
        error: e.message
      });
    });
}

async function handleGetActoresRequest(req, res) {
  await actorCollection.find().toArray()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Error al obtener los actores",
        error: e.message
      });
    });
}

async function handleGetActorByIdRequest(req, res) {
  try {
    const oid = ObjectId.createFromHexString(req.params.id);

    await actorCollection.findOne({ _id: oid })
      .then((data) => {
        if (data === null) {
          return res.status(404).json({
            message: "Actor no encontrado"
          });
        }

        return res.status(200).json(data);
      })
      .catch((e) => {
        return res.status(500).json({
          message: "Error al obtener el actor",
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

async function handleGetActoresByPeliculaIdRequest(req, res) {
  try {
    const oid = ObjectId.createFromHexString(req.params.pelicula);

    await actorCollection.find({
      idPelicula: oid.toString()
    }).toArray()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((e) => {
        return res.status(500).json({
          message: "Error al obtener los actores de la película",
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
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest
};