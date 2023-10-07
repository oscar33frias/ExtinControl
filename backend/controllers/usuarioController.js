// Importación de las dependencias necesarias
import sql from "mssql"; 
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js"; 
import { emailOlvidePassword,emailRegistro } from "../helpers/email.js";


const registrar = async (req, res) => {
  const { nombre, password, email } = req.body;

  try {
    const pool = await sql.connect();

    // Verificar si el usuario ya existe en la base de datos usando parámetros de consulta
    const verificarQuery = `SELECT * FROM Usuario WHERE email = @email`;
    const verificarResult = await pool.request()
      .input("email", sql.NVarChar(255), email)
      .query(verificarQuery);

    if (verificarResult.recordset.length > 0) {
      return res.status(400).json({ msg: "Usuario ya registrado" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const token = generarId(); // Asumiendo que esta función se encuentra definida en el contexto

    const insertQuery = `
      INSERT INTO Usuario (nombre, password, email, token)
      OUTPUT INSERTED.*
      VALUES (@nombre, @password, @email, @token)
    `;

    await pool.request()
      .input("nombre", sql.NVarChar(255), nombre)
      .input("password", sql.NVarChar(255), hashedPassword)
      .input("email", sql.NVarChar(255), email)
      .input("token", sql.NVarChar(255), token)
      .query(insertQuery);

    emailRegistro({ email, nombre, token });

    res.json({ msg: "Usuario registrado exitosamente" });

  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};


const autenticar = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await sql.connect();

    // Utilizar parámetros en las consultas SQL para prevenir inyección SQL
    const query = `SELECT * FROM Usuario WHERE email = @email`;
    const result = await pool.request()
      .input("email", sql.NVarChar(255), email)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const usuario = result.recordset[0];

    if (!usuario.confirmado) {
      return res.status(403).json({ msg: "Cuenta no confirmada" });
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (!passwordMatch) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const token = generarJWT(usuario.id);
    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      token
    });

  } catch (error) {
    console.error("Error durante la autenticación:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};


const confirmar = async (req, res) => {
  const { token } = req.params;

  try {
    const pool = await sql.connect();
    const request = pool.request();
    request.input("token", sql.NVarChar, token);

    // Actualizar el estado de confirmación del usuario y limpiar el token
    const updateResult = await request.query(
      "UPDATE Usuario SET Confirmado = 1, Token = '' WHERE Token = @token"
    );

    if (updateResult.rowsAffected[0] === 0) {
      return res.status(403).json({ msg: "Token no válido o ya ha sido usado" });
    }

    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.error("Error al confirmar usuario:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const olvidePassword = async (req, res) => {
  const { email } = req.body;

  try {
    const pool = await sql.connect();
    const request = pool.request();
    request.input("email", sql.NVarChar, email);

    const usuarioResult = await request.query("SELECT * FROM Usuario WHERE email = @email");
    if (usuarioResult.recordset.length === 0) {
      return res.status(403).json({ msg: "El usuario no existe" });
    }

    const usuarioOlvidarPassword = usuarioResult.recordset[0];
    usuarioOlvidarPassword.token = generarId();

    await pool
      .request()
      .input("token", sql.NVarChar, usuarioOlvidarPassword.token)
      .input("email", sql.NVarChar, email)
      .query("UPDATE Usuario SET token = @token WHERE email = @email");

    // Primero, enviar la respuesta al cliente antes de proceder con operaciones adicionales
    res.json({ msg: "Hemos enviado un email con las instrucciones" });

    // Después de enviar la respuesta, procedemos a enviar el correo
    emailOlvidePassword({
      email: usuarioOlvidarPassword.email,
      nombre: usuarioOlvidarPassword.nombre,
      token: usuarioOlvidarPassword.token
    });

  } catch (error) {
    console.error("Error en olvidePassword:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const comprobarPassword = async (req, res) => {
  const { token } = req.params;

  try {
    const pool = await sql.connect();

    const query = `
      SELECT COUNT(*) AS tokenCount FROM Usuario WHERE token = @Token
    `;

    const result = await pool
      .request()
      .input("Token", sql.NVarChar(255), token)
      .query(query);

    if (result.recordset[0].tokenCount > 0) {
      return res.json({ msg: "Token válido y el usuario existe" });
    }

    return res.status(403).json({ msg: "Token no válido" });

  } catch (error) {
    console.error("Error en comprobarPassword:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const pool = await sql.connect();

    const hashedPassword = await bcrypt.hash(password, 10); // SaltRounds: 10

    // Actualizar la contraseña y eliminar el token directamente
    const updateQuery = `
      UPDATE Usuario 
      SET password = @Password, token = '' 
      WHERE token = @Token
    `;

    const result = await pool
      .request()
      .input("Password", sql.NVarChar(255), hashedPassword)
      .input("Token", sql.NVarChar(255), token)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      return res.json({ msg: "Contraseña modificada" });
    }

    return res.status(403).json({ msg: "Token no válido" });

  } catch (error) {
    console.error("Error en nuevoPassword:", error.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};


const perfil = async (req, res) => {
  const {usuario}= req;
  res.json(usuario);
};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarPassword,
  nuevoPassword,
  perfil,
};
