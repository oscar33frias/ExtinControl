// plantaRoutes.js
import express from "express";
import multer from "multer";
import {
  obtenerPlanta,
  obtenerPlantas,
  nuevaPlanta,
} from "../controllers/plantaControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// Configura Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para crear una nueva planta con carga de archivo
router
  .route("/")
  .get(checkAuth, obtenerPlantas)
  .post(checkAuth, upload.single("imagen"), nuevaPlanta);

router
  .route("/:id")
  .get(checkAuth, obtenerPlanta)

export default router;
