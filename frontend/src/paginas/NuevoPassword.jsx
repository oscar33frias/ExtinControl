

const NuevoPassword = () => {
  return (
    <div  className="flex items-center justify-center ">
  
      <h1 className="text-red-600 font-black text-6xl capitalize">
        Restablece tu password para acceder a tus
        <span className="text-yellow-700"> extintores</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Escribe tu nuevo password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Guardar Password"
          className="bg-red-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-800 transition-colors"
        />
      </form>
    </div>
  );
};

export default NuevoPassword;
