import sql from "mssql";
const agregarCheckList = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const {
    extintorId,
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

  // Supongo que req.usuario.id contiene el ID del usuario autenticado
  const usuarioId = req.usuario.id;

  try {
    // Conectar a la base de datos usando el pool de conexiones
    const pool = await sql.connect();

    // Verificar si el extintor pertenece al usuario autenticado
    const extintorQuery = `
      SELECT * FROM Extintores
      WHERE id = @extintorId AND usuario_id = @usuarioId
    `;
    const extintorResult = await pool
      .request()
      .input("extintorId", sql.Int, extintorId)
      .input("usuarioId", sql.Int, usuarioId)
      .query(extintorQuery);

    // Comprobar si el extintor no fue encontrado o no pertenece al usuario
    if (extintorResult.recordset.length === 0) {
      return res
        .status(404)
        .json({ msg: "Extintor no encontrado o no pertenece al usuario" });
    }

    // Insertar un elemento en la lista de verificación (checkList)
    const insertQuery = `
      INSERT INTO checkList (obstruido, instrucciones, senalamiento, manometro, sello, condFisica, mangera, boquilla, etiqueta, prioridad, extintorId)
      VALUES (@obstruido, @instrucciones, @senalamiento, @manometro, @sello, @condFisica, @mangera, @boquilla, @etiqueta, @prioridad, @extintorId)
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
      .input("extintorId", sql.Int, extintorId)
      .query(insertQuery);

    // Obtener el elemento de checkList agregado
    const checkListQuery = `
      SELECT * FROM checkList
      WHERE extintorId = @extintorId
      ORDER BY id DESC
    `;
    const checkListResult = await pool
      .request()
      .input("extintorId", sql.Int, extintorId)
      .query(checkListQuery);

    // Responder con el elemento de checkList agregado
    res.json(checkListResult.recordset[0]);
  } catch (error) {
    // Manejar errores y responder con un mensaje de error en caso de falla
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const obtenerCheckList = async (req, res) => {
  // Obtener el parámetro 'id' de la solicitud
  const { id } = req.params;

  try {
    // Conectar a la base de datos utilizando el pool de conexiones
    const pool = await sql.connect();

    // Consultar la base de datos para obtener el checklist con el ID especificado
    const query = `
        SELECT * FROM checkList
        WHERE id = @id
      `;

    // Ejecutar la consulta SQL con el parámetro 'id'
    const result = await pool.request().input("id", sql.Int, id).query(query);

    // Comprobar si no se encontró ningún resultado (ningún checklist con ese ID)
    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "El checklist no existe" });
    }

    // Consultar la base de datos para obtener información adicional del checklist
    const queryUsuario = `
    SELECT *
    FROM checkList
    INNER JOIN Extintores ON checkList.extintorId = Extintores.id
    WHERE checkList.id = @id;
    
      `;

    // Ejecutar la consulta SQL con el parámetro 'id' para obtener información adicional
    const resultUsuario = await pool
      .request()
      .input("id", sql.Int, id)
      .query(queryUsuario);

    // Obtener el primer registro de la respuesta, que contiene información adicional
    const checkList = resultUsuario.recordset[0];

    // Comprobar si el checklist pertenece al usuario autenticado
    if (checkList.usuario_id !== req.usuario.id) {
      return res
        .status(403)
        .json({ msg: "No tienes permisos para ver este checklist" });
    }

    // Responder con los datos del checklist obtenidos de la base de datos
    res.json(checkList);
  } catch (error) {
    // Manejar errores y responder con un mensaje de error en caso de falla
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const actualizarCheckList = async (req, res) => {
  const { id } = req.params; // Obtenemos el 'id' de los parámetros de la solicitud

  try {
    // Establecemos una conexión a la base de datos utilizando 'sql.connect()'
    const pool = await sql.connect();

    // Consulta SQL para seleccionar el checklist con el 'id' proporcionado
    const query = `
        SELECT * FROM checkList
        WHERE id = @id
      `;

    // Ejecutamos la consulta SQL con el valor del 'id' proporcionado
    const result = await pool.request().input("id", sql.Int, id).query(query);

    // Verificamos si no se encontraron resultados (el checklist no existe)
    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "El checklist no existe" });
    }

    // Consulta SQL para obtener información adicional del checklist, incluyendo datos de la tabla 'Extintores'
    const queryUsuario = `
    SELECT *
    FROM checkList
    INNER JOIN Extintores ON checkList.extintorId = Extintores.id
    WHERE checkList.id = @id;
    
      `;

    // Ejecutamos la consulta SQL con el valor del 'id' para obtener información adicional
    const resultUsuario = await pool
      .request()
      .input("id", sql.Int, id)
      .query(queryUsuario);

    // Obtenemos el primer registro de la respuesta, que contiene información adicional del checklist
    const checkList = resultUsuario.recordset[0];

    // Comprobamos si el checklist pertenece al usuario autenticado comparando 'usuario_id' del checklist con el 'id' del usuario autenticado en 'req.usuario'
    if (checkList.usuario_id !== req.usuario.id) {
      return res
        .status(403)
        .json({ msg: "No tienes permisos para ver este checklist" });
    }

    // Obtenemos los valores actuales del checklist para poder combinarlos con los valores proporcionados en la solicitud
    const existingCheckList = result.recordset[0];

    // Usamos la destructuración para asignar los valores actuales o los proporcionados en 'req.body' a las constantes correspondientes
    const {
      obstruido = existingCheckList.obstruido,
      instrucciones = existingCheckList.instrucciones,
      senalamiento = existingCheckList.senalamiento,
      manometro = existingCheckList.manometro,
      sello = existingCheckList.sello,
      condFisica = existingCheckList.condFisica,
      mangera = existingCheckList.mangera,
      boquilla = existingCheckList.boquilla,
      etiqueta = existingCheckList.etiqueta,
      prioridad = existingCheckList.prioridad,
    } = req.body;

    // Consulta SQL para actualizar los valores del checklist en la base de datos
    const updateQuery = `
      UPDATE checkList
      SET
        obstruido = @obstruido,
        instrucciones = @instrucciones,
        senalamiento = @senalamiento,
        manometro = @manometro,
        sello = @sello,
        condFisica = @condFisica,
        mangera = @mangera,
        boquilla = @boquilla,
        etiqueta = @etiqueta,
        prioridad = @prioridad
      WHERE id = @id
    `;

    // Ejecutamos la consulta SQL de actualización con los valores correspondientes
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

    // Si todo se ejecuta correctamente, respondemos con un mensaje de éxito
    res.json({ msg: "Checklist actualizado con éxito" });
  } catch (error) {
    // En caso de error, lo registramos en la consola y respondemos con un mensaje de error
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
