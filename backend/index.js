import express from "express";
import dotenv from "dotenv";
import {
  verificarTablasYCrearUsuario,
  verificarTablasYCrearExtintor,
  verificarTablasYCrearCheckList,
  verificarTablasYCrearExtintorColaborador,
  verificarTablasYCrearPosicion
} from "./utils/verificarTablas.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import extintorRoutes from "./routes/extintorRoutes.js";
import checkListRoutes from "./routes/checkRoutes.js";

import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();

const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

const main = async () => {
  try {
    app.use(cors(corsOptions));
    await verificarTablasYCrearUsuario("Usuario");
    await verificarTablasYCrearExtintor("Extintores");
    await verificarTablasYCrearCheckList("checkList");
    await verificarTablasYCrearExtintorColaborador("ExtintorColaborador");
    await verificarTablasYCrearPosicion("Posicion"); 
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
