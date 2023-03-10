import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const useGetDateTable = () => {
  const [paginado, setPaginado] = useState({});

  const [limite, setLimite] = useState(5);
  const [pagina, setPagina] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      setLoading(true);

      const { token } = JSON.parse(localStorage.getItem("profile"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await clienteAxios.get(
        `api/users?limite=${limite}&pagina=${pagina}`,
        config
      );
      setPaginado(data);
      setLoading(false);
    };

    obtenerUsuarios();
  }, [limite, pagina]);

  return {
    paginado,
    pagina,
    loading,
    setLimite,
    setPagina,
  };
};

export default useGetDateTable;
