const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha.split("T")[0].split("-"));
  console.log("desde formatearFecha", fecha);
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return nuevaFecha.toLocaleDateString("es-ES", opciones);
};

export default formatearFecha;
