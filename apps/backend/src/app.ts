import express from "express";
import cors from "cors";
import router from "./index";
import continentesRoutes from "./routes/continente";
import paisRoutes from "./routes/pais";
import cidadesRoutes from "./routes/cidades";

const app = express();

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

app.use(express.json());

// ROTAS
app.use("/api", router);
app.use("/api/continentes", continentesRoutes);
app.use("/api/paises", paisRoutes);
app.use("/api/cidades", cidadesRoutes);

app.get("/", (req, res) => {
    res.send("Hello Typescript");
});

export default app;
