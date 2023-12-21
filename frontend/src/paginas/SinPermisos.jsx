import { Link } from "react-router-dom";

const SinPermisos = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] text-center">
      <h1 className="text-9xl font-extrabold text-white tracking-widest text-shadow">Usted Aun No Esta Agregado a Ningun Extintor</h1>
      <div className="bg-[#FF6A3D] px-10 text-sm rounded rotate-12 absolute">
        No Autorizado
      </div>
      <Link to="/" className="mt-5 inline-block">
        <button
          className="relative text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span
            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            Go Home
          </span>
        </button>
      </Link>
    </main>
  )
}

export default SinPermisos