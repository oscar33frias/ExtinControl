import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>', // sender address
    to: email, // list of receivers
    subject: "Confirma tu cuenta", // Subject line
    text: "Hola, confirma tu cuenta", // plain text body
   html: `
    <h1>Hola ${nombre}</h1>
    <p>Confirma tu cuenta</p>
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>
    `,

  });
};


export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>', // sender address
    to: email, // list of receivers
    subject: "Restablece tu password", // Subject line
    text: "Hola, restablece tu cuenta", // plain text body
   html: `
    <h1>Hola ${nombre}</h1>
    <p>Restablece tu cuenta</p>
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Confirmar cuenta</a>
    `,

  });
};
