import express from "express";
import checkAuth from "../middleware/checkAuth.js";

import {
  agregarCheckList,
  actualizarCheckList,
  eliminarCheckList,
  actualizarCheckListMovil,
  obtenerCheckListsforTable
} from "../controllers/checkListController.js";

const router = express.Router();
router.post("/", checkAuth, agregarCheckList);
router
  .route("/:id")
  .put(checkAuth, actualizarCheckList)
  .delete(checkAuth, eliminarCheckList);

router.put("/actualizar/:id", checkAuth, actualizarCheckListMovil);
router.get("/table", checkAuth, obtenerCheckListsforTable);
r
export default router;
