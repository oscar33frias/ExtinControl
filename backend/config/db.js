import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.VAR_USER,
  password: process.env.VAR_PASSWORD,
  server: process.env.VAR_SERVER,
  database: process.env.VAR_DATABASE,
  options: {
    encrypt: false, // Cambiar a true si se necesita una conexión segura
  },
};


export const conectarDB = async () => {
  try {
    await sql.connect(config);
    console.log("Conexión exitosa a SQL Server");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
