import express from "express";
import dotenv from "dotenv";
import {
  verificarTablasYCrearUsuario,
  verificarTablasYCrearExtintor,
  verificarTablasYCrearCheckList,
} from "./utils/verificarTablas.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import extintorRoutes from "./routes/extintorRoutes.js";
import checkListRoutes from "./routes/checkRoutes.js";


const app = express();
app.use(express.json());
dotenv.config();

const main = async () => {
  try {
    await verificarTablasYCrearUsuario("Usuario");
    await verificarTablasYCrearExtintor("Extintores");
    await verificarTablasYCrearCheckList("checkList");
    app.use("/api/usuarios", usuarioRoutes);
    app.use("/api/extintores", extintorRoutes);
    app.use("/api/checkList", checkListRoutes);

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
