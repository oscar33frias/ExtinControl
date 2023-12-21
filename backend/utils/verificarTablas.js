import sql from "mssql";
import { conectarDB } from "../config/db.js";
import { crearTablaUsuario } from "../models/Usuarios.js";
import { crearTablaExtintores } from "../models/Extintores.js";
import { createTablaCheckList } from "../models/checkList.js";
import { crearTablaPlantaColaborador } from "../models/PlantaColaborador.js";
import { crearTablaPosicion } from "../models/posicion.js";
import { crearTablaPlantas } from "../models/Plantas.js";
 


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



export const verificarTablasYCrearPlantaColaborador = async (tabla) => {
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
      await crearTablaPlantaColaborador();
      console.log("Tabla PlantaColaborador creada");
    } else {
      console.log("La tabla PlantaColaborador ya está creada");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export const verificarTablasYCrearPosicion = async (tabla) => {
  try {
    await conectarDB();

    const pool = await sql.connect();
    const tablaCheckExiste = await pool
      .request()
      .query(
        `SELECT COUNT(*) AS existe FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tabla}'`
      );

    if (tablaCheckExiste.recordset[0].existe === 0) {
      // La tabla Posicion no existe, la creamos
      await crearTablaPosicion();
      console.log("Tabla Posicion creada");
    } else {
      console.log("La tabla Posicion ya está creada");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};


export const verificarTablasYCrearPlanta = async (tabla) => {
  try {
    await conectarDB();

    const pool = await sql.connect();
    const tablaPlantasExiste = await pool
      .request()
      .query(
        `SELECT COUNT(*) AS existe FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tabla}'`
      );

    if (tablaPlantasExiste.recordset[0].existe === 0) {
      // La tabla Planta no existe, la creamos
      await crearTablaPlantas();
      console.log("Tabla Plantas creada");
    } else {
      console.log("La tabla Plantas ya está creada");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};