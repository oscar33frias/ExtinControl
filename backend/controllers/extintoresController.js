import sql from "mssql";

const obtenerExtintores = async (req, res) => {
  try {
    const pool = await sql.connect();
    const query = `
      SELECT * FROM Extintores
      WHERE usuario_id = @usuarioId
    `;
    const result = await pool
      .request()
      .input("usuarioId", sql.Int, req.usuario.id)
      .query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const nuevoExtintor = async (req, res) => {
  const { codigo, marca, capacidad } = req.body;
  const usuarioId = req.usuario.id; // Asume que req.usuario contiene el objeto de usuario autenticado

  try {
    const pool = await sql.connect();
    const query = `
      INSERT INTO Extintores (codigo, marca, capacidad, usuario_id)
      VALUES (@codigo, @marca, @capacidad, @usuarioId)
    `;
    await pool
      .request()
      .input("codigo", sql.NVarChar(200), codigo)
      .input("marca", sql.NVarChar(200), marca)
      .input("capacidad", sql.Float, capacidad)
      .input("usuarioId", sql.Int, usuarioId)
      .query(query);

    res.json({ msg: "Extintores creado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const obtenerExtintor = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id; // Asume que req.usuario contiene el objeto de usuario autenticado

  try {
    const pool = await sql.connect();
    const query = `
        SELECT * FROM Extintores
        WHERE id = @ExtintoresId AND usuario_id = @usuarioId
      `;
    const result = await pool
      .request()
      .input("ExtintoresId", sql.Int, id)
      .input("usuarioId", sql.Int, usuarioId)
      .query(query);

    if (result.recordset.length === 0) {
      const error = new Error("Extintores no encontrado o no autorizado");
      return res.status(404).json({ msg: error.message });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Controlador para editar un Extintores existente
const editarExtintor = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id; // Asume que req.usuario contiene el objeto de usuario autenticado
  const { codigo, marca, capacidad } = req.body;

  try {
    const pool = await sql.connect();
    const query = `
        UPDATE Extintores
        SET codigo = @codigo, marca = @marca, capacidad = @capacidad
        WHERE id = @ExtintoresId AND usuario_id = @usuarioId
      `;
    const result = await pool
      .request()
      .input("codigo", sql.NVarChar(200), codigo)
      .input("marca", sql.NVarChar(200), marca)
      .input("capacidad", sql.Float, capacidad)
      .input("ExtintoresId", sql.Int, id)
      .input("usuarioId", sql.Int, usuarioId)
      .query(query);

    if (result.rowsAffected[0] === 0) {
      const error = new Error("Extintores no encontrado o no autorizado");
      return res.status(404).json({ msg: error.message });
    }

    res.json({ msg: "Extintores actualizado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Controlador para eliminar un Extintores
const eliminarExtintor = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id; // Asume que req.usuario contiene el objeto de usuario autenticado

  try {
    const pool = await sql.connect();
    const query = `
        DELETE FROM Extintores
        WHERE id = @ExtintoresId AND usuario_id = @usuarioId
      `;
    const result = await pool
      .request()
      .input("ExtintoresId", sql.Int, id)
      .input("usuarioId", sql.Int, usuarioId)
      .query(query);

    if (result.rowsAffected[0] === 0) {
      const error = new Error("Extintores no encontrado o no autorizado");
      return res.status(404).json({ msg: error.message });
    }

    res.json({ msg: "Extintores eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const agregarColaborador = async (req, res) => {};
const eliminarColaborador = async (req, res) => {};
const obtenerCheckList = async (req, res) => {};

export {
  obtenerExtintores,
  nuevoExtintor,
  obtenerExtintor,
  editarExtintor,
  eliminarExtintor,
  agregarColaborador,
  eliminarColaborador,
  obtenerCheckList,
};
