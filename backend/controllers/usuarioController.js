import sql from "mssql";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";


const registrar = async (req, res) => {
  const { nombre, password, email } = req.body;

  try {
    const pool = await sql.connect();

    // Verificar si el usuario ya existe en la base de datos
    const verificarQuery = `SELECT * FROM Usuario WHERE email = '${email}'`;
    const verificarResult = await pool.request().query(verificarQuery);

    if (verificarResult.recordset.length > 0) {
      throw new Error('Usuario ya registrado');
    }

    // Encriptamos la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generar un nuevo token
    const token = generarId();

    // Registrar el nuevo usuario
    const insertQuery = `
      INSERT INTO Usuario (nombre, password, email, token)
      VALUES ('${nombre}', '${hashedPassword}', '${email}', '${token}')
    `;
    const insertResult = await pool.request().query(insertQuery);

    if (insertResult.rowsAffected[0] > 0) {
      res.json({ message: "Usuario registrado exitosamente" });
    } else {
      throw new Error("Error en el servidor al registrar usuario");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
const autenticar = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Establecemos una conexión con la base de datos SQL Server
      const pool = await sql.connect();
  
      // Consultamos la base de datos para obtener al usuario por su dirección de correo electrónico (email)
      const query = `SELECT * FROM Usuario WHERE email = '${email}'`;
      const result = await pool.request().query(query);
  
      // Verificamos si el resultado de la consulta contiene algún registro
      if (result.recordset.length === 0) {
        // Si no se encuentra el usuario, retornamos un error 404
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
      }
  
      // Obtenemos el primer registro de la consulta, ya que se espera un único resultado
      const usuario = result.recordset[0];
  
      // Verificamos si el usuario está confirmado
      if (usuario.confirmado==0) {
        // Si el usuario no está confirmado, retornamos un error 403
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
      }
  
      // Comparamos la contraseña proporcionada con la contraseña almacenada en la base de datos
      const passwordMatch = await bcrypt.compare(password, usuario.password);
  
      if (passwordMatch) {

        // Si la contraseña es correcta, generamos un token JWT y lo enviamos como respuesta
        const token = generarJWT(usuario._id);
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: token
        });
      } else {
        // Si la contraseña es incorrecta, retornamos un error 403
        const error = new Error("Tu contraseña es incorrecta");
        return res.status(403).json({ msg: error.message });
      }
    } catch (error) {
      // Capturamos y manejamos cualquier error que ocurra durante el proceso
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };
  



export { registrar ,autenticar};
