import sql from "mssql";
const obtenerExtintores = async (req, res) => {
  try {
    const pool = await sql.connect();
    const usuarioId = req.usuario.id;
    const result = await pool.request()
      .input("usuarioId", sql.Int, usuarioId)
      .query(`
        SELECT e.* 
        FROM Extintores e
        LEFT JOIN ExtintorColaborador ec ON e.id = ec.extintor_id
        WHERE e.usuario_id = @usuarioId OR ec.colaborador_id = @usuarioId
      `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener extintores:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const EXTN = "EXTN";

const nuevoExtintor = async (req, res) => {
  try {
    const { codigo, marca, capacidad } = req.body;
    const { id: usuarioId } = req.usuario;
    const pool = await sql.connect();

    const result = await pool
      .request()
      .input("codigo", sql.NVarChar(200), EXTN + codigo)
      .input("marca", sql.NVarChar(200), marca)
      .input("capacidad", sql.Float, capacidad)
      .input("usuarioId", sql.Int, usuarioId).query(`
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

    // Primero, obtener el extintor
    const extintorResponse = await pool.request().input("id", sql.Int, id)
      .query(`
        SELECT * FROM Extintores
        WHERE id = @id
      `);

    if (extintorResponse.recordset.length === 0) {
      return res.status(404).json({ msg: "Extintor no encontrado" });
    }

    const extintor = extintorResponse.recordset[0];

    // Verificar si el usuario tiene permisos para ver el extintor
    const colaboradorResponse = await pool.request()
      .input("extintorId", sql.Int, id)
      .input("usuarioId", sql.Int, usuarioId)
      .query(`
        SELECT COUNT(*) AS count
        FROM ExtintorColaborador
        WHERE extintor_id = @extintorId AND colaborador_id = @usuarioId
      `);

    const colaboradorCount = colaboradorResponse.recordset[0].count;

    if (extintor.usuario_id !== usuarioId && colaboradorCount === 0) {
      return res
        .status(403)
        .json({ msg: "No tienes permisos para ver este extintor" });
    }

    // A continuación, obtener los checklists relacionados con ese extintor
    const checklistsResponse = await pool
      .request()
      .input("extintorId", sql.Int, id).query(`
        SELECT * FROM checkList
        WHERE extintorId = @extintorId
      `);

    const checklists = checklistsResponse.recordset;

    // Obtener los colaboradores relacionados con ese extintor
    const colaboradoresResponse = await pool
      .request()
      .input("extintorId", sql.Int, id).query(`
        SELECT u.*
        FROM usuario u
        INNER JOIN ExtintorColaborador ec ON u.id = ec.colaborador_id
        WHERE ec.extintor_id = @extintorId
      `);

    const colaboradores = colaboradoresResponse.recordset;

    // Enviar el extintor, sus checklists y sus colaboradores en la respuesta
    res.json({ extintor, checklists, colaboradores });
  } catch (error) {
    console.error(
      "Error al obtener extintor, checklists y colaboradores:",
      error.message
    );
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

    const result = await pool
      .request()
      .input("codigo", sql.NVarChar(200), codigo)
      .input("marca", sql.NVarChar(200), marca)
      .input("capacidad", sql.Float, capacidad)
      .input("ExtintoresId", sql.Int, id)
      .input("usuarioId", sql.Int, usuarioId)
      .query(query);

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ msg: "Extintor no encontrado o no autorizado" });
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
      return res
        .status(404)
        .json({ msg: "Extintor no encontrado o no autorizado para eliminar" });
    }

    res.json({ msg: "Extintor eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar extintor:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const buscarColaborador = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await sql.connect().then((pool) =>
      pool.request().input("email", sql.VarChar, email).query(`
          SELECT * FROM usuario
          WHERE email = @email
        `)
    );

    return result.recordset.length === 0
      ? res.status(404).json({ msg: "Usuario no encontrado" })
      : res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al buscar usuario:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const agregarColaborador = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const pool = await sql.connect();

    const verificarQuery = `
      SELECT COUNT(*) AS count
      FROM ExtintorColaborador
      WHERE extintor_id = @extintorId AND colaborador_id = (
        SELECT id FROM usuario WHERE email = @email
      )
    `;

    const verificarResult = await pool
      .request()
      .input("extintorId", sql.Int, id)
      .input("email", sql.VarChar, email)
      .query(verificarQuery);

    if (verificarResult.recordset[0].count > 0) {
      return res
        .status(400)
        .json({ msg: "El colaborador ya está agregado al extintor" });
    }

    const colaboradorQuery = `
      SELECT id FROM usuario WHERE email = @email
    `;

    const colaboradorResult = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query(colaboradorQuery);

    const colaborador_id = colaboradorResult.recordset[0].id;

    const agregarQuery = `
      INSERT INTO ExtintorColaborador (extintor_id, colaborador_id)
      OUTPUT INSERTED.*
      VALUES (@extintorId, @colaboradorId)
    `;

    const agregarResult = await pool
      .request()
      .input("extintorId", sql.Int, id)
      .input("colaboradorId", sql.Int, colaborador_id)
      .query(agregarQuery);

    res.json({ msg: "Colaborador agregado con éxito" });
  } catch (error) {
    console.error("Error al agregar colaborador:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const eliminarColaborador = async (req, res) => {
  const { id } = req.params;
  const { id: usuarioId } = req.usuario;

  try {
    const pool = await sql.connect();

    const verificarQuery = `
      SELECT COUNT(*) AS count
      FROM ExtintorColaborador
      WHERE colaborador_id = @id AND extintor_id IN (
        SELECT id FROM Extintores WHERE usuario_id = @usuarioId
      )
    `;

    const verificarResult = await pool
      .request()
      .input("id", sql.Int, id)
      .input("usuarioId", sql.Int, usuarioId)
      .query(verificarQuery);

    if (verificarResult.recordset[0].count === 0) {
      return res
        .status(404)
        .json({
          msg: "Colaborador no encontrado o no autorizado para eliminar",
        });
    }

    const eliminarQuery = `
      DELETE FROM ExtintorColaborador
      WHERE colaborador_id = @id
    `;

    await pool.request().input("id", sql.Int, id).query(eliminarQuery);

    res.json({ msg: "Colaborador eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar colaborador:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
export {
  obtenerExtintores,
  nuevoExtintor,
  obtenerExtintor,
  editarExtintor,
  eliminarExtintor,
  agregarColaborador,
  eliminarColaborador,
  buscarColaborador,
};
