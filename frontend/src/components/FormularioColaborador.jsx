import { useState } from "react";
const FormularioColaborador = () => {
    const [email,setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
       <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="enail"
                      >
                        Email Colaborador
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email del Usuario"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <input
                      type="submit"
                      className="bg-yellow-500 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                      value="Buscar Colaborador"
                    />
    </form>
  );
};

export default FormularioColaborador;
