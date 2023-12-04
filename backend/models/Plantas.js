import sql from "mssql";

const createPlantaTableQuery = `
CREATE TABLE Plantas (
  id INT PRIMARY KEY IDENTITY(1,1),
  nombrePlanta NVARCHAR(50) ,
  ubicacion NVARCHAR(200) ,
  nombreArchivo NVARCHAR(200)
 
)
`;

export const crearTablaPlantas = async () => {
  try {
    const pool = await sql.connect();
    await pool.request().query(createPlantaTableQuery);
    console.log("Tabla Plantas creada");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
