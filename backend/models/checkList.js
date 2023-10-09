import sql from "mssql";

const createCheckListTableQuery = `
CREATE TABLE checkList (
  id INT PRIMARY KEY IDENTITY(1,1),
  codigo NVARCHAR(50) NOT NULL,
  obstruido NVARCHAR(50) NOT NULL,
  instrucciones NVARCHAR(200) NOT NULL,
  senalamiento NVARCHAR(200) NOT NULL ,
  manometro  nvarchar(200) NOT NULL,
  sello NVARCHAR(200) NOT NULL,
  condFisica NVARCHAR(200) NOT NULL,
  manguera NVARCHAR(200) NOT NULL,  
  boquilla NVARCHAR(200) NOT NULL,
  etiqueta NVARCHAR(200) NOT NULL,
  fecha_checklist DATETIME DEFAULT GETDATE(),
  estado bit default 0, 
  prioridad VARCHAR(255) NOT NULL CHECK (prioridad IN ('Baja', 'Media', 'Alta')),
  extintorId Int NOT NULL,
)
`;

export const createTablaCheckList = async () => {
  try {
    const pool = await sql.connect();
    await pool.request().query(createCheckListTableQuery);
    console.log("Tabla CheckList creada");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
