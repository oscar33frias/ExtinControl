import sql from "mssql";
import { conectarDB } from "../config/db.js";
import { crearTablaUsuario } from "../models/Usuarios.js";

export const verificarTablasYCrearUsuario = async (tabla) => {
try {
await conectarDB();

// Verificar si la tabla Usuario ya está creada
const pool = await sql.connect();
const tablaUsuarioExiste = await pool
.request()
.query(
`SELECT COUNT(*) AS existe FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tabla}'`
);

if (tablaUsuarioExiste.recordset[0].existe === 0) {
// La tabla Usuario no existe, la creamos
await crearTablaUsuario();
} else {
console.log("La tabla Usuario ya está creada");
}
} catch (error) {
console.error(`Error: ${error.message}`);
process.exit(1);
}
};
