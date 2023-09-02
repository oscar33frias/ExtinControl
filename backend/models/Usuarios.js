import sql from "mssql";

const createUsuarioTableQuery = `
CREATE TABLE Usuario (
  id INT PRIMARY KEY IDENTITY(1,1),
  nombre NVARCHAR(50) NOT NULL,
  password NVARCHAR(50) NOT NULL,
  email NVARCHAR(50) NOT NULL UNIQUE,
  token BIT DEFAULT 0,
  confirmado BIT DEFAULT 0,
  createdAt DATETIME DEFAULT GETDATE(),
  updatedAt DATETIME DEFAULT GETDATE()
)
`;

export const crearTablaUsuario = async () => {
  try {
    const pool = await sql.connect();
    await pool.request().query(createUsuarioTableQuery);
    console.log("Tabla Usuario creada");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
