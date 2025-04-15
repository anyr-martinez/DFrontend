import React, { createContext, useState, useContext, useEffect } from "react";
import { AxiosPublico } from "../../Axios/Axios";
import {
  CrearFilial,
  ListarFiliales,
} from "../../Configuration/ApiUrls";
import { useContextUsuario } from "../user/UserContext";

// Crear y exportar el contexto
export const FilialContext = createContext();

// Proveedor del contexto
export const FilialProvider = ({ children }) => {
  const { token } = useContextUsuario();
  const [filial, setFilial] = useState(null);
  const [listaFilial, setListaFilial] = useState([]);

  useEffect(() => {
    const cargarFiliales = async () => {
      try {
        await ActualizarLista();
      } catch (error) {
        console.log("Error al cargar las Filiales:", error);
      }
    };
    cargarFiliales();
  }, []);

  const ActualizarLista = async () => {
    try {
      const respuesta = await AxiosPublico.get(ListarFiliales);
      setListaFilial(respuesta.data);
    } catch (error) {
      console.log("Error al listar las filiales:", error);
    }
  };

  const ObtenerFilial = async (id) => {
    try {
      const respuesta = await AxiosPublico.get(`${ObtenerFilial}/${id}`);
      if (respuesta.status === 200) {
        setFilial(respuesta.data);
      }
    } catch (error) {
      console.log("Error al obtener la filial:", error);
    }
  };

  const CrearNuevaFilial = async (nuevaFilial) => {
    AxiosPublico.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const respuesta = await AxiosPublico.post(CrearFilial, nuevaFilial);
      if (respuesta.status === 201 || respuesta.status === 200) {
        await ActualizarLista();
        return { success: true, message: "Filial creada correctamente" };
      } else {
        return { success: false, message: "Error al guardar la filial" };
      }
    } catch (error) {
      console.log("Error al crear la filial:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error al guardar la filial",
      };
    }
  };

  return (
    <FilialContext.Provider
      value={{
        filial,
        listaFilial,
        setFilial,
        setListaFilial,
        ActualizarLista,
        CrearNuevaFilial,
        ObtenerFilial,
      }}
    >
      {children}
    </FilialContext.Provider>
  );
};

// Hook personalizado
export const useContextFilial = () => useContext(FilialContext);
