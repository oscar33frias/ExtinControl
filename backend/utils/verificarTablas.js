import sql from "mssql";
import { conectarDB } from "../config/db.js";
import { crearTablaUsuario } from "../models/Usuarios.js";
import { crearTablaExtintores } from "../models/Extintores.js";
import { createTablaCheckList } from "../models/checkList.js";

export const verificarTablasYCrearUsuario = async (tabla) => {
  try {
    await conectarDB();

    // Verificar si la tabla Usuario ya está creada
    const pool = await sql.connect();
    const tablaUsuarioExiste = await pool
      .request()
      .query(
        `SELECT COUNT(*) AS existe FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tabla}'`
      );

    if (tablaUsuarioExiste.recordset[0].existe === 0) {
      // La tabla Usuario no existe, la creamos
      await crearTablaUsuario();
      console.log("Tabla Usuario creada");
    } else {
      console.log("La tabla Usuario ya está creada");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export const verificarTablasYCrearExtintor = async (tabla) => {
  try {
    await conectarDB();

    // Verificar si la tabla Usuario ya está creada
    const pool = await sql.connect();
    const tablaUsuarioExiste = await pool
      .request()
      .query(
        `SELECT COUNT(*) AS existe FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tabla}'`
      );

    if (tablaUsuarioExiste.recordset[0].existe === 0) {
      // La tabla Usuario no existe, la creamos
      await crearTablaExtintores();
      console.log("Tabla Extintores creada");
    } else {
      console.log("La tabla extintores ya está creada");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};


export const verificarTablasYCrearCheckList = async (tabla) => {
    try {
      await conectarDB();
  
      const pool = await sql.connect();
      const tablaCheckExiste = await pool
        .request()
        .query(
          `SELECT COUNT(*) AS existe FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tabla}'`
        );
  
      if (tablaCheckExiste.recordset[0].existe === 0) {
        // La tabla Usuario no existe, la creamos
        await createTablaCheckList();
        console.log("Tabla CheckList creada");
      } else {
        console.log("La tabla checklist ya está creada");
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };