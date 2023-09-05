import sql from "mssql";
import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id; // Extraer el ID del usuario del token JWT
      console.log(userId);
      const pool = await sql.connect(); // Establecer una conexión con la base de datos SQL Server
      await pool.connect();

      // Consultar la base de datos para obtener al usuario por su ID
      const query = `
        SELECT * FROM Usuario WHERE id = @userId
      `;
      const request = pool.request();
      request.input("userId", sql.Int, userId); // Utilizar el ID del usuario
      const result = await request.query(query);

      if (result.recordset.length === 1) {
        // Usuario encontrado en la base de datos
        req.usuario = result.recordset[0];
        next();
      } else {
        // Usuario no encontrado
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }
    } catch (error) {
      return res.status(401).json({ msg: "Token no válido" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
