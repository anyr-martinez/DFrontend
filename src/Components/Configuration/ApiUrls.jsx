// Base URL
export const Servidor = 'http://localhost:4000';

//Rutas de usuario
export const UsuarioIniciarSesion = '/api/usuarios/login';
export const ListarUsuarios = '/api/usuarios/get';
export const ObtenerById = '/api/usuarios/obtener';
export const CrearUsuario = '/api/usuarios/create';
export const EliminarUsuario = '/api/usuarios/delete';
export const SubirFoto  = '/api/usuarios/subir-foto';

//Rutas de filiales
export const CrearFilial = '/api/filial/create';
export const ObtenerFilial = '/api/filial/get';
export const ListarFiliales = '/api/filial/listar';
export const ObtenerByNombre= '/api/filial/getByNombre';