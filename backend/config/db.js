import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();
/*
const config = {
  user: process.env.USER,
  password: process.env.PASSWORD ,
  server: process.env.SERVER ,
  database: process.env.DATABASE ,
  options: {
    encrypt: false, // Cambiar a true si se necesita una conexión segura
  },
};

*/

const config = {
  user: process.env.USER2 ,
  password: process.env.PASSWORD2,
  server: process.env.SERVER2,
  database: process.env.DATABASE2,
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
