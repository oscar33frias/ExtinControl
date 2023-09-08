import sql from "mssql";

const obtenerExtintores = async (req, res) => {
    const { id } = req.params;

  try {
    const pool = await sql.connect();

    // Verificar si el extintor existe
    const extintorQuery = `
      SELECT * FROM Extintores
      WHERE id = @id AND usuario_id = @usuarioId
    `;

    const extintorResult = await pool
      .request()
      .input("id", sql.Int, id)
      .input("usuarioId", sql.Int, req.usuario.id)
      .query(extintorQuery);

    if (extintorResult.recordset.length === 0) {
      return res.status(404).json({ msg: "El extintor no existe o no tienes permisos para verlo" });
    }

    const extintor = extintorResult.recordset[0];

    // Aquí debes realizar la lógica para obtener las tareas relacionadas con el extintor
    // Por ejemplo, puedes tener una tabla "Tareas" relacionada con "Extintores" mediante un campo "extintor_id"

    // Consultar tareas relacionadas con el extintor (adapta según tu estructura)
    const tareasQuery = `
      SELECT * FROM Tareas
      WHERE extintor_id = @extintorId
    `;

    const tareasResult = await pool
      .request()
      .input("extintorId", sql.Int, extintor.id)
      .query(tareasQuery);

    const tareas = tareasResult.recordset;

    res.json({ extintor, tareas });
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

export {
  obtenerExtintores,
  nuevoExtintor,
  obtenerExtintor,
  editarExtintor,
  eliminarExtintor,
  agregarColaborador,
  eliminarColaborador
};
