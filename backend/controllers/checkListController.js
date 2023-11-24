import sql from "mssql";

const agregarCheckList = async (req, res) => {
  console.log("dentro de agregar checklist");
  var {
    boquilla,
    condFisica,
    estado,
    etiqueta,
    fechaProximaHidrostatica,
    fechaProximaRecarga,
    fechaUltimaHidrostatica,
    fechaUltimaRecarga,
    instrucciones,
    manguera,
    manometro,
    obstruido,
    prioridad,
    sello,
    senalamiento,
    usuario,
    extintorId,
    codigo,
    fechaCheckList,
  } = req.body;
  function formatFecha(fecha) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // los meses en JavaScript empiezan en 0
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} 00:00:00`;
    return formattedDate;
  }
  fechaCheckList = formatFecha(fechaCheckList);
  fechaUltimaHidrostatica = formatFecha(fechaUltimaHidrostatica);
  fechaProximaHidrostatica = formatFecha(fechaProximaHidrostatica);
  fechaUltimaRecarga = formatFecha(fechaUltimaRecarga);
  fechaProximaRecarga = formatFecha(fechaProximaRecarga);

  console.log(
    "fechaCheckList",
    fechaCheckList,
    fechaProximaHidrostatica,
    fechaProximaRecarga,
    fechaUltimaHidrostatica,
    fechaUltimaRecarga
  );
  try {
    const pool = await sql.connect();

    const isExtintorOwnedByUser = await pool
      .request()
      .input("extintorId", sql.Int, extintorId).query(`
        SELECT 1 FROM Extintores
        WHERE id = @extintorId 
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
      .input("estado", sql.Int, estado)
      .input("usuario", sql.VarChar(255), usuario) // Agrega usuario aquí
      .input("extintorId", sql.Int, extintorId)
      .input("fechaUltimaHidrostatica", sql.DateTime, fechaUltimaHidrostatica)
      .input("fechaProximaHidrostatica", sql.DateTime, fechaProximaHidrostatica)
      .input("fechaUltimaRecarga", sql.DateTime, fechaUltimaRecarga)
      .input("fechaCheckList", sql.DateTime, fechaCheckList)
      .input("fechaProximaRecarga", sql.DateTime, fechaProximaRecarga).query(`
  INSERT INTO checkList (codigo, obstruido,fechaCheckList ,instrucciones, senalamiento, manometro, sello, condFisica, manguera, boquilla, etiqueta, fechaUltimaHidrostatica, fechaProximaHidrostatica, fechaUltimaRecarga, fechaProximaRecarga, prioridad, estado, usuario, extintorId)
  VALUES (@codigo, @obstruido, @instrucciones,@fechaCheckList, @senalamiento, @manometro, @sello, @condFisica, @manguera, @boquilla, @etiqueta, @fechaUltimaHidrostatica, @fechaProximaHidrostatica, @fechaUltimaRecarga, @fechaProximaRecarga, @prioridad, @estado, @usuario, @extintorId)
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

    const query = `
      SELECT *
      FROM checkList
      INNER JOIN Extintores ON checkList.extintorId = Extintores.id
      WHERE checkList.id = @id
    `;

    const result = await pool.request().input("id", sql.Int, id).query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        msg: "Checklist no encontrado",
      });
    }

    const [checkList] = result.recordset;

    res.json(checkList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const actualizarCheckList = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect();

    const fetchQuery = `
      SELECT *
      FROM checkList
      INNER JOIN Extintores ON checkList.extintorId = Extintores.id
      WHERE checkList.id = @id 
    `;

    const fetchedChecklist = await pool
      .request()
      .input("id", sql.Int, id)
      .query(fetchQuery);

    if (fetchedChecklist.recordset.length === 0) {
      return res.status(404).json({
        msg: "Checklist no encontrado",
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
        prioridad = @prioridad,
        usuario = @usuario,
        estado = @estado
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
      .input("estado", sql.Bit, updatedCheckList.estado)
      .query(updateQuery);

    res.json(updatedCheckList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const actualizarCheckListMovil = async (req, res) => {
  const { id } = req.params;
  console.log("entro al backend");

  try {
    const pool = await sql.connect();

    const fetchQuery = `
      SELECT *
      FROM checkList
      INNER JOIN Extintores ON checkList.extintorId = Extintores.id
      WHERE checkList.id = @id 
    `;

    const fetchedChecklist = await pool
      .request()
      .input("id", sql.Int, id)
      .query(fetchQuery);

    if (fetchedChecklist.recordset.length === 0) {
      return res.status(404).json({
        msg: "Checklist no encontrado",
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
        prioridad = @prioridad,
        usuario = @usuario,
        estado = @estado
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
      .input("estado", sql.Bit, updatedCheckList.estado)
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
  actualizarCheckListMovil,
};
