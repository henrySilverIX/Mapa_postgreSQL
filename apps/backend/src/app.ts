import express from "express";
import router from "./index";
import continentesRoutes from "./routes/continente";
import paisRoutes from "./routes/pais";
import cidadesRoutes from "./routes/cidades";


const app = express();

app.use(express.json());
app.use("/api", router);
app.use("/api/continentes", continentesRoutes);
app.use("/api/paises", paisRoutes);
app.use("/api/cidades", cidadesRoutes);

app.get("/", (req, res) =>{
    res.send("Hello Typescript");
});


export default app;