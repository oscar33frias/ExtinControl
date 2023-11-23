const formatearFecha = (fecha) => {
  if (!fecha) {
    return "Fecha no disponible";
  }

  const nuevaFecha = new Date(fecha.split("T")[0].split("-"));
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return nuevaFecha.toLocaleDateString("es-ES", opciones);
};

export default formatearFecha;