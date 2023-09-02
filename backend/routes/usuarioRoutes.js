import express from "express";
import { registrar } from "../controllers/usuarioController.js";
const router = express.Router();
router.post("/", registrar);

router.get("/",(req,res)=>{
    res.json({
        message:"hola desde get"
    })
})
export default router;
