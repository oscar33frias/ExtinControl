import sql from "mssql";

const obtenerExtintores = async (req, res) => {
  try {
    const pool = await sql.connect();
    const usuarioId = req.usuario.id;
    const result = await pool.request()
      .input("usuarioId", sql.Int, usuarioId)
      .query(`
        SELECT * 
        FROM Extintores 
        WHERE usuario_id = @usuarioId
      `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener extintores:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const nuevoExtintor = async (req, res) => {
  try {
    const { codigo, marca, capacidad } = req.body;
    const { id: usuarioId } = req.usuario;
    const pool = await sql.connect();

    const result = await pool.request()
      .input("codigo", sql.NVarChar(200), codigo)
      .input("marca", sql.NVarChar(200), marca)
      .input("capacidad", sql.Float, capacidad)
      .input("usuarioId", sql.Int, usuarioId)
      .query(`
        INSERT INTO Extintores (codigo, marca, capacidad, usuario_id)
        OUTPUT INSERTED.*
        VALUES (@codigo, @marca, @capacidad, @usuarioId)
      `);

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al crear extintor:", error.message);
    res.status(500).json({ msg: "Error en el servidor al crear el extintor" });
  }
};

const obtenerExtintor = async (req, res) => {
  const { id } = req.params;
  const { id: usuarioId } = req.usuario; 

  try {
    const pool = await sql.connect();
    const { recordset } = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT * FROM Extintores
        WHERE id = @id
      `);

    if (recordset.length === 0) {
      return res.status(404).json({ msg: "Extintor no encontrado" });
    }

    const extintor = recordset[0];  // Renombrando la variable para claridad

    if (extintor.usuario_id !== usuarioId) {
      return res.status(403).json({ msg: "No tienes permisos para ver este extintor" });
    }

    res.json(extintor);
  } catch (error) {
    console.error("Error al obtener extintor:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};


const editarExtintor = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id;
  const { codigo, marca, capacidad } = req.body;

  try {
    const pool = await sql.connect();

    const query = `
      UPDATE Extintores
      SET codigo = @codigo, marca = @marca, capacidad = @capacidad
      OUTPUT INSERTED.*
      WHERE id = @ExtintoresId AND usuario_id = @usuarioId
    `;

    const result = await pool.request()
      .input("codigo", sql.NVarChar(200), codigo)
      .input("marca", sql.NVarChar(200), marca)
      .input("capacidad", sql.Float, capacidad)
      .input("ExtintoresId", sql.Int, id)
      .input("usuarioId", sql.Int, usuarioId)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Extintor no encontrado o no autorizado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al editar extintor:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const eliminarExtintor = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id;

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
      return res.status(404).json({ msg: "Extintor no encontrado o no autorizado para eliminar" });
    }

    res.json({ msg: "Extintor eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar extintor:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const agregarColaborador = async (req, res) => {};
const eliminarColaborador = async (req, res) => {};

export {
  obtenerExtintores,
  nuevoExtintor,
  obtenerExtintor,
  editarExtintor,
  eliminarExtintor,
  agregarColaborador,
  eliminarColaborador,
};
