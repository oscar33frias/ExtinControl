import express from "express";
import checkAuth from "../middleware/checkAuth.js";

import {
  agregarCheckList,
  obtenerCheckList,
  actualizarCheckList,
  eliminarCheckList,
  cambiarEstado,
} from "../controllers/checkListController.js";

const router = express.Router();
router.post("/", checkAuth, agregarCheckList);
router
  .route("/:id")
  .get(checkAuth, obtenerCheckList)
  .put(checkAuth, actualizarCheckList)
  .delete(checkAuth, eliminarCheckList);
export default router;
