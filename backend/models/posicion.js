import sql from "mssql";

const createPosicionTableQuery = `
CREATE TABLE Posicion (
    [id] [int] primary key,
    [x] [int],
    [y] [int]
)
`;

export const crearTablaPosicion = async () => {
  try {
    const pool = await sql.connect();
    await pool.request().query(createPosicionTableQuery);
    console.log("Tabla Posicion creada");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};