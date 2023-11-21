import sql from "mssql";


const agregarCheckList = async (req, res) => {
  const {
    codigo,
    extintorId,
    obstruido,
    instrucciones,
    senalamiento,
    manometro,
    sello,
    condFisica,
    manguera,
    boquilla,
    etiqueta,
    prioridad,
  } = req.body;
  const usuarioId = req.usuario.id;

  try {
    const pool = await sql.connect();

    const isExtintorOwnedByUser = await pool
      .request()
      .input("extintorId", sql.Int, extintorId)
      .input("usuarioId", sql.Int, usuarioId).query(`
        SELECT 1 FROM Extintores
        WHERE id = @extintorId AND usuario_id = @usuarioId
      `);

    if (!isExtintorOwnedByUser.recordset.length) {
      return res
        .status(404)
        .json({ msg: "Extintor no encontrado o no pertenece al usuario" });
    }

    await pool
      .request()
      .input("codigo", sql.VarChar(255), codigo)
      .input("obstruido", sql.NVarChar(200), obstruido)
      .input("instrucciones", sql.NVarChar(200), instrucciones)
      .input("senalamiento", sql.NVarChar(200), senalamiento)
      .input("manometro", sql.NVarChar(200), manometro)
      .input("sello", sql.NVarChar(200), sello)
      .input("condFisica", sql.NVarChar(200), condFisica)
      .input("manguera", sql.NVarChar(200), manguera)
      .input("boquilla", sql.NVarChar(200), boquilla)
      .input("etiqueta", sql.NVarChar(200), etiqueta)
      .input("prioridad", sql.VarChar(255), prioridad)
      .input("extintorId", sql.Int, extintorId).query(`
        INSERT INTO checkList (codigo, obstruido, instrucciones, senalamiento, manometro, sello, condFisica, manguera, boquilla, etiqueta, prioridad, extintorId)
        VALUES (@codigo, @obstruido, @instrucciones, @senalamiento, @manometro, @sello, @condFisica, @manguera, @boquilla, @etiqueta, @prioridad, @extintorId)
      `);

    const result = await pool.request().input("extintorId", sql.Int, extintorId)
      .query(`
          SELECT TOP 1 * FROM checkList
          WHERE extintorId = @extintorId
          ORDER BY id DESC
      `);

    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const obtenerCheckList = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect();

    // Consulta combinada para obtener el checklist y verificar si pertenece al usuario autenticado en una sola operación
    const query = `
      SELECT *
      FROM checkList
      INNER JOIN Extintores ON checkList.extintorId = Extintores.id
      WHERE checkList.id = @id AND Extintores.usuario_id = @usuarioId
    `;

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("usuarioId", sql.Int, req.usuario.id)
      .query(query);

    // Si no se encuentra el checklist o no pertenece al usuario autenticado, responder con un mensaje adecuado
    if (result.recordset.length === 0) {
      return res.status(404).json({
        msg: "Checklist no encontrado o no tienes permisos para verlo",
      });
    }

    // Usar desestructuración para extraer el primer registro de la respuesta
    const [checkList] = result.recordset;

    res.json(checkList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const actualizarCheckList = async (req, res) => {
  const { id } = req.params;

  console.log(req.body);
  
  try {
    const pool = await sql.connect();

    const fetchQuery = `
      SELECT *
      FROM checkList
      INNER JOIN Extintores ON checkList.extintorId = Extintores.id
      WHERE checkList.id = @id AND Extintores.usuario_id = @usuarioId
    `;

    const fetchedChecklist = await pool
      .request()
      .input("id", sql.Int, id)
      .input("usuarioId", sql.Int, req.usuario.id)
      .query(fetchQuery);

    if (fetchedChecklist.recordset.length === 0) {
      return res.status(404).json({
        msg: "Checklist no encontrado o no tienes permiso para actualizarlo",
      });
    }

    const existingCheckList = fetchedChecklist.recordset[0];
    const updatedCheckList = {
      ...existingCheckList,
      ...req.body,
    };

    const updateQuery = `
      UPDATE checkList
      SET
        obstruido = @obstruido,
        instrucciones = @instrucciones,
        senalamiento = @senalamiento,
        manometro = @manometro,
        sello = @sello,
        condFisica = @condFisica,
        manguera = @manguera,
        boquilla = @boquilla,
        etiqueta = @etiqueta,
        prioridad = @prioridad
        usuario = @usuario
      WHERE id = @id
    `;

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("obstruido", sql.NVarChar(50), updatedCheckList.obstruido)
      .input("instrucciones", sql.NVarChar(200), updatedCheckList.instrucciones)
      .input("senalamiento", sql.NVarChar(200), updatedCheckList.senalamiento)
      .input("manometro", sql.NVarChar(200), updatedCheckList.manometro)
      .input("sello", sql.NVarChar(200), updatedCheckList.sello)
      .input("condFisica", sql.NVarChar(200), updatedCheckList.condFisica)
      .input("manguera", sql.NVarChar(200), updatedCheckList.manguera)
      .input("boquilla", sql.NVarChar(200), updatedCheckList.boquilla)
      .input("etiqueta", sql.NVarChar(200), updatedCheckList.etiqueta)
      .input("prioridad", sql.VarChar(255), updatedCheckList.prioridad)
      .input("usuario", sql.VarChar(255), updatedCheckList.usuario)
      .query(updateQuery);

    res.json(updatedCheckList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const eliminarCheckList = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect();

    // Verificamos si el checklist existe y si el usuario tiene permiso para eliminarlo
    const checkListQuery = `
      SELECT *
      FROM checkList
      INNER JOIN Extintores ON checkList.extintorId = Extintores.id
      WHERE checkList.id = @id AND Extintores.usuario_id = @usuarioId;
    `;

    const checkListResult = await pool
      .request()
      .input("id", sql.Int, id)
      .input("usuarioId", sql.Int, req.usuario.id)
      .query(checkListQuery);

    if (checkListResult.recordset.length === 0) {
      return res.status(404).json({
        msg: "El checklist no existe o no tienes permisos para eliminarlo",
      });
    }

    // Una vez que estamos seguros, eliminamos el checklist
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

const obtenerCheckLists = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect();

    const query = `
      SELECT * FROM checkList
      WHERE extintorId = @extintorId
    `;

    const result = await pool
      .request()
      .input("extintorId", sql.Int, id)
      .query(query);

    const checkLists = result.recordset;

    res.json(checkLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los checklists" });
  }
};

export {
  agregarCheckList,
  obtenerCheckLists,
  actualizarCheckList,
  eliminarCheckList,
  cambiarEstado,
};
