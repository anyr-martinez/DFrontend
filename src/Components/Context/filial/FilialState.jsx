import React, { useState, useEffect } from "react";
import { FilialContext } from "../filial/FilialContext";
import { AxiosPublico } from "../../Axios/Axios";
import { CrearFilialApi, ListarFiliales, ObtenerFilialPorId } from "../../Configuration/ApiUrls";
import { useContextUsuario } from "../user/UserContext";

export const FilialState = (props) => {
  const { token } = useContextUsuario();
  const [filial, setFilial] = useState(null);
  const [listaFilial, setListaFilial] = useState([]);

  // Cargar lista de filiales cuando el componente se monta
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

  // Función para obtener la lista de filiales
  const ActualizarLista = async () => {
    try {
      const respuesta = await AxiosPublico.get(ListarFiliales);
      const data = respuesta.data;
      setListaFilial(data);
    } catch (error) {
      console.log("Error al listar las filiales:", error);
    }
  };

  // Función para obtener una filial por ID
  const ObtenerFilial = async (id) => {
    
    try {
      const respuesta = await AxiosPublico.get(`${ObtenerFilialPorId}/${id}`);
      if (respuesta.status === 200) {
        setFilial(respuesta.data); 
      }
    } catch (error) {
      console.log("Error al obtener la filial:", error);
    }
  };

  // Función para crear una nueva filial
  const CrearNuevaFilial = async (nuevaFilial) => {
    AxiosPublico.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const respuesta = await AxiosPublico.post(CrearFilialApi, nuevaFilial);
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
      {props.children}
    </FilialContext.Provider>
  );
};
