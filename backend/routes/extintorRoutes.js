import express from "express";

import {
  obtenerExtintores,
  nuevoExtintor,
  obtenerExtintor,
  editarExtintor,
  eliminarExtintor,
  agregarColaborador,
  eliminarColaborador,
  buscarColaborador
  //obtenerCheckList,
} from "../controllers/extintoresController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, obtenerExtintores)
  .post(checkAuth, nuevoExtintor);

router
  .route("/:id")
  .get(checkAuth, obtenerExtintor)
  .put(checkAuth, editarExtintor)
  .delete(checkAuth, eliminarExtintor);

//router.get("/tareas/:id", checkAuth, obtenerCheckList);
router.post("/colaboradores", checkAuth, buscarColaborador);
router.post("/colaboradores/agregar", checkAuth, agregarColaborador);
router.delete("/colaboradores/:id", checkAuth, eliminarColaborador);
export default router;
