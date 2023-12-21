import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarPassword,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";
import {obtenerColaboradores} from "../controllers/extintoresController.js"
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router
  .route("/olvide-password/:token")
  .get(comprobarPassword)
  .post(nuevoPassword);
router.get("/perfil", checkAuth, perfil);
router.get("/obtener-colaboradores",checkAuth,obtenerColaboradores)

export default router;
