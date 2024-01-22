import sql from "mssql";
import fs from "fs/promises"; // Módulo para operaciones de sistema de archivos
import path from "path";

const directorioImagenes =process.env.DIRECTORIO_IMAGENES;

const obtenerPlantas = async (req, res) => {
  try {
    const pool = await sql.connect();
    const plantasResult = await pool.request().query(`
        SELECT *
        FROM Plantas
      `);

    const plantas = plantasResult.recordset;

    res.json(plantas);

  } catch (error) {
    console.error("Error al obtener plantas:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const nuevaPlanta = async (req, res) => {
  try {
    const { nombrePlanta, ubicacion } = req.body;
    const imagen = req.file;

    const nombreArchivo = `imagen_${Date.now()}.png`;
    const rutaArchivo = path.join(directorioImagenes, nombreArchivo);

    await fs.writeFile(rutaArchivo, imagen.buffer);

    const pool = await sql.connect();

    const result = await pool
      .request()
      .input("nombrePlanta", sql.NVarChar(200), nombrePlanta)
      .input("ubicacion", sql.NVarChar(200), ubicacion)
      .input("nombreArchivo", sql.NVarChar(200), nombreArchivo).query(`
        INSERT INTO Plantas (nombrePlanta, ubicacion, nombreArchivo)
        OUTPUT INSERTED.*
        VALUES (@nombrePlanta, @ubicacion, @nombreArchivo)
      `);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor al crear la planta" });
    console.log("Error al crear planta:", error.message);
  }
};

const obtenerPlanta = async (req, res) => {
  const { id } = req.params;
  const { id: usuarioId } = req.usuario;

  try {
    const pool = await sql.connect();

    const plantaResponse = await pool
      .request()
      .input("id", sql.Int, id)
      .input("usuarioId", sql.Int, usuarioId).query(`
        SELECT *
        FROM Plantas
        WHERE id = @id 
      `);

    if (plantaResponse.recordset.length === 0) {
      return res.status(404).json({ msg: "Planta no encontrada" });
    }

    const planta = plantaResponse.recordset[0];

    res.json({ planta });
  } catch (error) {
    console.error("Error al obtener planta:", error.message);
    res.status(500).json({ msg: "Error en el servidor al obtener la planta" });
  }
};


export { obtenerPlantas, nuevaPlanta, obtenerPlanta};
