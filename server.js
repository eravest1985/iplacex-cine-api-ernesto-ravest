import express from "express";
import cors from "cors";
import client from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import ActorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", peliculaRoutes);
app.use("/api", ActorRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido al cine Iplacex");
});

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor Express ejecutándose en puerto ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Error al conectar con MongoDB Atlas");
    console.log(e);
  });