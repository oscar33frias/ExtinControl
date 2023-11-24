import sql from "mssql";

const createExtintoresTableQuery = `
CREATE TABLE Extintores (
  id INT PRIMARY KEY IDENTITY(1,1),
  codigo NVARCHAR(50) ,
  marca NVARCHAR(200) ,
  capacidad FLOAT,
  fecha_creacion DATETIME DEFAULT GETDATE(),
  usuario_id INT ,
  colaboradores_id INT ,
  posicion INT,
  ubicacion NVARCHAR(200),
  tipo NVARCHAR(200),
)
`;

export const crearTablaExtintores = async () => {
  try {
    const pool = await sql.connect();
    await pool.request().query(createExtintoresTableQuery);
    console.log("Tabla Extintores creada");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
