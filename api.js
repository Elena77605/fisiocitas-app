import * as SecureStore from 'expo-secure-store';
import { API_URL } from './config';

const TOKEN_KEY = 'auth_token';

// Guardar, leer y borrar el token de sesión (cifrado en el celular)
export const guardarToken = (token) => SecureStore.setItemAsync(TOKEN_KEY, token);
export const leerToken = () => SecureStore.getItemAsync(TOKEN_KEY);
export const borrarToken = () => SecureStore.deleteItemAsync(TOKEN_KEY);

// Función base para llamar a la API
async function peticion(ruta, opciones = {}) {
  const token = await leerToken();
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const datos = await respuesta.json().catch(() => ({}));
  return { ok: respuesta.ok, status: respuesta.status, datos };
}

export const registrar = (cuerpo) =>
  peticion('/register', { method: 'POST', body: JSON.stringify(cuerpo) });

export const iniciarSesion = (cuerpo) =>
  peticion('/login', { method: 'POST', body: JSON.stringify(cuerpo) });

export const cerrarSesion = () => peticion('/logout', { method: 'POST' });