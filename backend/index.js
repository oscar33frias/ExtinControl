import express from "express";
import dotenv from "dotenv";
import sql from "mssql";
import { verificarTablasYCrearUsuario } from "./utils/tablasUtils.js";
import usuarioRoutes from './routes/usuarioRoutes.js'


const app = express();
app.use(express.json())
dotenv.config();

const main = async () => {
try {
await verificarTablasYCrearUsuario('Usuario');
app.use("/api/usuarios", usuarioRoutes);
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
