import express from "express";
import router from "./index";

const app = express();

app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) =>{
    res.send("Hello Typescript");
});


export default app;