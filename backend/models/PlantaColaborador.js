import sql from "mssql";

const createPlantaColaboradorTableQuery = `
CREATE TABLE PlantaColaborador (
    [id] [int] IDENTITY(1,1)  primary key,
    [planta_id] [int] ,
    [colaborador_id] [int] 
)
`;

export const crearTablaPlantaColaborador = async () => {
  try {
    const pool = await sql.connect();
    await pool.request().query(createPlantaColaboradorTableQuery);
    console.log("Tabla PlantaColaborador fue creada");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
