import { Link } from "react-router-dom";

const PreviewExtintor = ({ extintor }) => {
  const { id, codigo, marca } = extintor;
  return (
    <div className=" border-b p-5 flex">
      <p className="flex-1 font-bold">{codigo}
      <span className=" text-sm text-gray-500 uppercase font-bold">{marca}</span>
        </p>
      <Link to={`${id}`} className=" text-gray-600 hover:text-gray-800 uppercase text-sm font-bold">
        Ver más
      </Link> 
    </div>
  );
};

export default PreviewExtintor;
