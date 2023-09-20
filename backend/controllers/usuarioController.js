// Importación de las dependencias necesarias
import sql from "mssql"; // Biblioteca para interactuar con SQL Server
import bcrypt from "bcrypt"; // Biblioteca para el hashing de contraseñas
import generarId from "../helpers/generarId.js"; // Función para generar un ID aleatorio
import generarJWT from "../helpers/generarJWT.js"; // Función para generar tokens JWT
import { emailOlvidePassword,emailRegistro } from "../helpers/email.js";
// Función para registrar un nuevo usuario
const registrar = async (req, res) => {
  const { nombre, password, email } = req.body; // Obtener datos del cuerpo de la solicitud (request body)

  try {
    const pool = await sql.connect(); // Establecer una conexión con la base de datos

    // Verificar si el usuario ya existe en la base de datos
    const verificarQuery = `SELECT * FROM Usuario WHERE email = '${email}'`;
    // Realizar una consulta a la base de datos para verificar si el usuario ya existe
    const verificarResult = await pool.request().query(verificarQuery);

    if (verificarResult.recordset.length > 0) {
      const error = new Error("Usuario ya registrado");
      return res.status(400).json({ msg: error.message });
    }

    // Encriptar la contraseña antes de almacenarla en la base de datos
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generar un nuevo token (no se muestra cómo se implementa)
    const token = generarId();

    // Registrar el nuevo usuario en la base de datos
    const insertQuery = `
      INSERT INTO Usuario (nombre, password, email, token)
      VALUES ('${nombre}', '${hashedPassword}', '${email}', '${token}')
    `;
    const insertResult = await pool.request().query(insertQuery);

    if (insertResult.rowsAffected[0] > 0) {
      res.json({ msg: "Usuario registrado exitosamente" });
         // Aquí invocamos la función emailRegistro
         emailRegistro({
          email: email,
          nombre: nombre,
          token: token
        });
  
    } else {
      throw new Error("Error en el servidor al registrar usuario");
    }
  } catch (error) {
    console.error(error.msg);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Función para autenticar a un usuario
const autenticar = async (req, res) => {
  const { email, password } = req.body; // Obtener datos del cuerpo de la solicitud

  try {
    const pool = await sql.connect(); // Establecer una conexión con la base de datos SQL Server

    // Consultar la base de datos para obtener al usuario por su dirección de correo electrónico (email)
    const query = `SELECT * FROM Usuario WHERE email = '${email}'`;
    const result = await pool.request().query(query);

    // Verificar si el resultado de la consulta contiene algún registro
    if (result.recordset.length === 0) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }

    // Obtener el primer registro de la consulta, ya que se espera un único resultado
    const usuario = result.recordset[0];

    // Verificar si el usuario está confirmado
    if (usuario.confirmado == 0) {
      const error = new Error("Tu cuenta no ha sido confirmada");
      return res.status(403).json({ msg: error.message });
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (passwordMatch) {
      // Si la contraseña es correcta, generar un token JWT y enviarlo como respuesta
      const token = generarJWT(usuario.id); // Utiliza el ID como número entero

      res.json({
        _id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: token, // Utiliza el token generado
      });
    } else {
      // Si la contraseña es incorrecta, retornar un error 403
      const error = new Error("Tu contraseña es incorrecta");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    // Capturar y manejar cualquier error que ocurra durante el proceso
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const confirmar = async (req, res) => {
  const { token } = req.params;

  try {
    // Buscar el usuario por token en la base de datos
    const pool = await sql.connect(); // Establecer una conexión con la base de datos SQL Server

    const request = pool.request();
    request.input("token", sql.NVarChar, token);
    const usuarioConfirmar = await request.query(
      "SELECT * FROM Usuario WHERE Token = @token"
    );
/*
    if (usuarioConfirmar.recordset.length === 0) {
      return res.status(403).json({ msg: "Token no válido" });
    }
    */

    // Actualizar el usuario para confirmarlo
    const updateRequest = pool.request();
    updateRequest.input("token", sql.NVarChar, token);
    await updateRequest.query(
      "UPDATE Usuario SET Confirmado = 1, Token = '' WHERE Token = @token"
    );

    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  try {
    const pool = await sql.connect(); // Establecer una conexión con la base de datos SQL Server

    const request = pool.request();
    request.input("email", sql.NVarChar, email);
    const usuario = await request.query(
      "SELECT * FROM Usuario WHERE email = @email"
    );

    console.log("este es el usuario ",usuario);

    if (usuario.recordset.length === 0) {
      const error = new Error("El usuario no existe");
      return res.status(403).json({ msg: error.message });
    }

    const usuarioOlvidarPassword = usuario.recordset[0];
    usuarioOlvidarPassword.token = generarId();
    console.log("este es el usuarioOlvidarPass ", usuarioOlvidarPassword);
    await pool
      .request()
      .input("token", sql.NVarChar, usuarioOlvidarPassword.token)
      .input("email", sql.NVarChar, email)
      .query("UPDATE Usuario SET token = @token WHERE email = @email");

    res.json({ msg: "Hemos enviado un email con las instrucciones" });

    emailOlvidePassword({
      email: usuarioOlvidarPassword.email,
      nombre: usuarioOlvidarPassword.nombre,
      token: usuarioOlvidarPassword.token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const comprobarPassword = async (req, res) => {
  const { token } = req.params;

  try {
    const pool = await sql.connect(); // Establecer una conexión con la base de datos SQL Server

    // Consultar si el token existe en la tabla Usuario
    const query = `
      SELECT COUNT(*) AS TokenValido FROM Usuario WHERE token = @Token
    `;
    const result = await pool
      .request()
      .input("Token", sql.NVarChar(255), token)
      .query(query);

    if (result.recordset[0].TokenValido > 0) {
      // Token válido
      res.json({ msg: "Token válido y el usuario existe" });
    } else {
      const error = new Error("Token no válido");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const pool = await sql.connect(); // Establecer una conexión con la base de datos SQL Server

    // Obtener al usuario por su token
    const usuarioQuery = `
      SELECT ID, token FROM Usuario WHERE token = @Token
    `;
    const usuarioResult = await pool
      .request()
      .input("Token", sql.NVarChar(255), token)
      .query(usuarioQuery);

    if (usuarioResult.recordset.length > 0) {
      const usuario = usuarioResult.recordset[0];

      // Actualizar la contraseña y eliminar el token
      const updateQuery = `
        UPDATE Usuario SET password = @Password, token = '' WHERE ID = @UsuarioID
      `;
      await pool
        .request()
        .input("Password", sql.NVarChar(255), hashedPassword)
        .input("UsuarioID", sql.Int, usuario.ID)
        .query(updateQuery);

      res.json({ msg: "Contraseña modificada" });
    } else {
      const error = new Error("Token no válido");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const perfil = async (req, res) => {
  res.json({ msg: "desde perfin" });
};

// Exportar las funciones para su uso en otros módulos
export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarPassword,
  nuevoPassword,
  perfil,
};
