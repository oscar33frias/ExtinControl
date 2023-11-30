import sql from "mssql";

const createPlantaTableQuery = `
CREATE TABLE planta (
  id INT PRIMARY KEY IDENTITY(1,1),
  nombrePlanta NVARCHAR(50) ,
  obstruido NVARCHAR(50) ,
 
)
`;

export const crearTablaPlanta = async () => {
  try {
    const pool = await sql.connect();
    await pool.request().query(createPlantaTableQuery);
    console.log("Tabla CheckList creada");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
