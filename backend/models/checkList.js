import sql from "mssql";

const createCheckListTableQuery = `
CREATE TABLE checkList (
  id INT PRIMARY KEY IDENTITY(1,1),
  codigo NVARCHAR(50) NOT NULL,
  obstruido NVARCHAR(50) ,
  instrucciones NVARCHAR(200) ,
  senalamiento NVARCHAR(200)  ,
  manometro  nvarchar(200) ,
  sello NVARCHAR(200) ,
  condFisica NVARCHAR(200) ,
  manguera NVARCHAR(200) ,  
  boquilla NVARCHAR(200) ,
  etiqueta NVARCHAR(200) ,
  fecha_checklist DATETIME DEFAULT GETDATE(),
  estado bit default 0, 
  prioridad VARCHAR(255)  CHECK (prioridad IN ('Baja', 'Media', 'Alta')),
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
