import sql from "mssql";

import fs from "fs/promises"; // Módulo para operaciones de sistema de archivos
import path from "path";
const directorioImagenesCasa =
  "/Users/oscarfriaszavalza/Desktop/EXTINTORES_PROGRAMAS /ExtinControl/backend/upload";
const directorioImagenesTrabajo =
  "C:/Users/oscar.frias/Documents/Extintores/ExtinControl/backend/upload"; // Configuración para servir archivos estáticos desde el directorio de imágenes

const obtenerPlantas = async (req, res) => {
  try {
    const pool = await sql.connect();
    console.log("dentro de obtener plantas");
    const plantasResult = await pool.request().query(`
        SELECT *
        FROM Plantas
      `);

    const plantas = plantasResult.recordset;

    res.json(plantas);

    console.log("plantas", plantas);
  } catch (error) {
    console.error("Error al obtener plantas:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const nuevaPlanta = async (req, res) => {
  try {
    const { nombrePlanta, ubicacion } = req.body;
    const imagen = req.file;
    console.log("Datos recibidos en el backend:", req.body, req.file);

    const nombreArchivo = `imagen_${Date.now()}.png`;
    const rutaArchivo = path.join(directorioImagenesTrabajo, nombreArchivo);

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
    console.error("Error al crear planta:", error.message);
    res.status(500).json({ msg: "Error en el servidor al crear la planta" });
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

const eliminarPlanta = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id;

  try {
    const pool = await sql.connect();

    const result = await pool
      .request()
      .input("PlantaId", sql.Int, id)
      .input("usuarioId", sql.Int, usuarioId).query(`
        DELETE FROM Plantas
        OUTPUT DELETED.*
        WHERE id = @PlantaId AND usuario_id = @usuarioId
      `);

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ msg: "Planta no encontrada o no autorizada para eliminar" });
    }

    res.json({ msg: "Planta eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar planta:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export { obtenerPlantas, nuevaPlanta, obtenerPlanta, eliminarPlanta };
