import sql from "mssql";

const createExtintorColaboradorTableQuery = `
CREATE TABLE ExtintorColaborador (
    [id] [int] IDENTITY(1,1) NOT NULL primary key,
    [extintor_id] [int] NOT NULL,
    [colaborador_id] [int] NOT NULL
)
`;

export const crearTablaExtintorColaborador = async () => {
  try {
    const pool = await sql.connect();
    await pool.request().query(createExtintorColaboradorTableQuery);
    console.log("Tabla ExtintorColaboradorCreada creada");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
