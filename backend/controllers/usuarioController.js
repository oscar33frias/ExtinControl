import sql from "mssql";
import bcrypt from "bcrypt"


const registrar = async (req, res) => {
const { nombre, password, email } = req.body;

try {
const pool = await sql.connect();

// Verificar si el usuario ya existe en la base de datos
const verificarQuery = `
SELECT * FROM Usuario WHERE email = '${email}'
`;
const verificarResult = await pool.request().query(verificarQuery);

if (verificarResult.recordset.length > 0) {
const error = new Error('Usuario ya registrado');
return res.status(400).json({ msg: error.message });
}

//encriptamos la contrasena 
const saltRounds =10
const hashedPassword= await bcrypt.hash(password,saltRounds)

// Registrar el nuevo usuario
const insertQuery = `
INSERT INTO Usuario (nombre, password, email)
VALUES ('${nombre}', '${hashedPassword}', '${email}')
`;
const insertResult = await pool.request().query(insertQuery);

if (insertResult.rowsAffected[0] > 0) {
res.json({ message: "Usuario registrado exitosamente" });
} else {
res.status(500).json({ message: "Error en el servidor al registrar usuario" });
}
} catch (error) {
console.error(error);
res.status(500).json({ message: "Error en el servidor" });
}
};

export { registrar };
