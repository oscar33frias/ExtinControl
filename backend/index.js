import express from "express";
import dotenv from "dotenv";
import sql from "mssql";
import {
  verificarTablasYCrearUsuario,
  verificarTablasYCrearExtintor,
} from "./utils/verificarTablas.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import extintorRoutes from "./routes/extintorRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();

const main = async () => {
  try {
    await verificarTablasYCrearUsuario("Usuario");
    await verificarTablasYCrearExtintor("Extintores");
    app.use("/api/usuarios", usuarioRoutes);
    app.use("/api/extintores", extintorRoutes);

    const PORT = process.env.PORT || 4001;

    app.listen(PORT, () => {
      console.log("Servidor corriendo desde el puerto " + PORT);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

main();
