import sql from "mssql";

const agregarCheckList = async (req, res) => {
  const {
    idExtintor,
    obstruido,
    instrucciones,
    senalamiento,
    manometro,
    sello,
    condFisica,
    mangera,
    boquilla,
    etiqueta,
    prioridad,
  } = req.body;
  const usuarioId = req.usuario.id; // Supongo que req.usuario.id contiene el ID del usuario autenticado

  try {
    const pool = await sql.connect();

    // Verificar si el extintor pertenece al usuario autenticado
    const extintorQuery = `
        SELECT * FROM Extintores
        WHERE id = @idExtintor AND usuario_id = @usuarioId
      `;
    const extintorResult = await pool
      .request()
      .input("idExtintor", sql.Int, idExtintor)
      .input("usuarioId", sql.Int, usuarioId)
      .query(extintorQuery);

    if (extintorResult.recordset.length === 0) {
      return res
        .status(404)
        .json({ msg: "Extintor no encontrado o no pertenece al usuario" });
    }

    // Insertar un elemento en la lista de verificación (checkList)
    const insertQuery = `
        INSERT INTO checkList (obstruido, instrucciones, senalamiento, manometro, sello, condFisica, mangera, boquilla, etiqueta, prioridad, extintorId)
        VALUES (@obstruido, @instrucciones, @senalamiento, @manometro, @sello, @condFisica, @mangera, @boquilla, @etiqueta, @prioridad, @idExtintor)
      `;
    await pool
      .request()
      .input("obstruido", sql.NVarChar(200), obstruido)
      .input("instrucciones", sql.NVarChar(200), instrucciones)
      .input("senalamiento", sql.NVarChar(200), senalamiento)
      .input("manometro", sql.NVarChar(200), manometro)
      .input("sello", sql.NVarChar(200), sello)
      .input("condFisica", sql.NVarChar(200), condFisica)
      .input("mangera", sql.NVarChar(200), mangera)
      .input("boquilla", sql.NVarChar(200), boquilla)
      .input("etiqueta", sql.NVarChar(200), etiqueta)
      .input("prioridad", sql.VarChar(255), prioridad)
      .input("idExtintor", sql.Int, idExtintor)
      .query(insertQuery);

    res.json({ msg: "Elemento de checkList agregado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const obtenerCheckList = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect();

    const query = `
        SELECT * FROM checkList
        WHERE id = @id
      `;

    const result = await pool.request().input("id", sql.Int, id).query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "El checklist no existe" });
    }

    const queryUsuario = `
    SELECT *
    FROM checkList
    INNER JOIN Extintores ON checkList.extintorId = Extintores.id
    WHERE checkList.id = @id;
    
      `;

    const resultUsuario = await pool
      .request()
      .input("id", sql.Int, id)
      .query(queryUsuario);

    const checkList = resultUsuario.recordset[0];

    if (checkList.usuario_id !== req.usuario.id) {
      return res
        .status(403)
        .json({ msg: "No tienes permisos para ver este checklist" });
    }

    res.json(checkList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const actualizarCheckList = async (req, res) => {
  const { id } = req.params;
  const {
    obstruido,
    instrucciones,
    senalamiento,
    manometro,
    sello,
    condFisica,
    mangera,
    boquilla,
    etiqueta,
    prioridad,
  } = req.body;

  try {
    const pool = await sql.connect();

    const checkListQuery = `
        SELECT * FROM checkList
        WHERE id = @id
      `;

    const checkListResult = await pool
      .request()
      .input("id", sql.Int, id)
      .query(checkListQuery);

    if (checkListResult.recordset.length === 0) {
      return res.status(404).json({ msg: "El checklist no existe" });
    }
    const checkListResultconPermisos = await pool
      .request()
      .input("id", sql.Int, id).query(`
      SELECT *
      FROM checkList
      INNER JOIN Extintores ON checkList.extintorId = Extintores.id
      WHERE checkList.id = @id;
    `);
    const checkListConPermisos = checkListResultconPermisos.recordset[0];

    if (checkListConPermisos.usuario_id !== req.usuario.id) {
      return res
        .status(403)
        .json({ msg: "No tienes permisos para actualizar este checklist" });
    }

    const updateQuery = `
        UPDATE checkList
        SET obstruido = @obstruido, instrucciones = @instrucciones, senalamiento = @senalamiento, manometro = @manometro, sello = @sello, condFisica = @condFisica, mangera = @mangera, boquilla = @boquilla, etiqueta = @etiqueta, prioridad = @prioridad
        WHERE id = @id
      `;

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("obstruido", sql.NVarChar(50), obstruido)
      .input("instrucciones", sql.NVarChar(200), instrucciones)
      .input("senalamiento", sql.NVarChar(200), senalamiento)
      .input("manometro", sql.NVarChar(200), manometro)
      .input("sello", sql.NVarChar(200), sello)
      .input("condFisica", sql.NVarChar(200), condFisica)
      .input("mangera", sql.NVarChar(200), mangera)
      .input("boquilla", sql.NVarChar(200), boquilla)
      .input("etiqueta", sql.NVarChar(200), etiqueta)
      .input("prioridad", sql.VarChar(255), prioridad)
      .query(updateQuery);

    res.json({ msg: "Checklist actualizado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const eliminarCheckList = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect();

    const checkListQuery = `
        SELECT * FROM checkList
        WHERE id = @id
      `;

    const checkListResult = await pool
      .request()
      .input("id", sql.Int, id)
      .query(checkListQuery);

    if (checkListResult.recordset.length === 0) {
      return res.status(404).json({ msg: "El checklist no existe" });
    }

    const checkListResultconPermisos = await pool
      .request()
      .input("id", sql.Int, id).query(`
      SELECT *
      FROM checkList
      INNER JOIN Extintores ON checkList.extintorId = Extintores.id
      WHERE checkList.id = @id;
    `);
    const checkListConPermisos = checkListResultconPermisos.recordset[0];

    if (checkListConPermisos.usuario_id !== req.usuario.id) {
      return res
        .status(403)
        .json({ msg: "No tienes permisos para actualizar este checklist" });
    }

    const deleteQuery = `
        DELETE FROM checkList
        WHERE id = @id
      `;

    await pool.request().input("id", sql.Int, id).query(deleteQuery);

    res.json({ msg: "Checklist eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const cambiarEstado = async (req, res) => {};

export {
  agregarCheckList,
  obtenerCheckList,
  actualizarCheckList,
  eliminarCheckList,
  cambiarEstado,
};
