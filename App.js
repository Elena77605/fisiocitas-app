import { useState, useEffect } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import RegisterScreen from './screens/RegisterScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import {
  registrar, iniciarSesion, cerrarSesion,
  guardarToken, leerToken, borrarToken,
} from './api';

export default function App() {
  const [pantalla, setPantalla] = useState('cargando');
  const [datos, setDatos] = useState(null);
  const [nombre, setNombre] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Al abrir la app: si hay token guardado, entra directo a Inicio
  useEffect(() => {
     (async () => {
      const token = await leerToken();
      if (token) {
        setNombre('');
        setPantalla('inicio');
      } else {
        setPantalla('login');
      }
    })();
  }, []);
  

  const enviarRegistro = async () => {
    setCargando(true);
    setMensaje('');
    try {
      const r = await registrar({
        name: datos.nombre,
        email: datos.correo,
        telefono: datos.telefono,
        password: datos.password,
        password_confirmation: datos.confirmar,
        consentimiento: true,
      });
      if (r.ok) {
        Alert.alert('Registro exitoso', 'Ya puedes iniciar sesión.');
        setPantalla('login');
      } else if (r.status === 422) {
        const primero = Object.values(r.datos.errors || {})[0];
        setMensaje(primero ? primero[0] : 'Datos no válidos');
      } else if (r.status === 429) {
        setMensaje('Demasiados intentos. Espera un minuto.');
      } else {
        setMensaje('No se pudo completar el registro.');
      }
    } catch (e) {
      setMensaje('No hay conexión con el servidor.');
    }
    setCargando(false);
  };

  const entrar = async (correo, password) => {
    setCargando(true);
    setMensaje('');
    try {
      const r = await iniciarSesion({ email: correo, password });
      if (r.ok) {
        await guardarToken(r.datos.token);
        setNombre(r.datos.user.name);
        setPantalla('inicio');
      } else if (r.status === 429) {
        setMensaje('Demasiados intentos. Espera un minuto.');
      } else if (r.status === 401 || r.status === 422) {
        setMensaje('Correo o contraseña incorrectos');
      } else {
        setMensaje('No se pudo iniciar sesión.');
      }
    } catch (e) {
      setMensaje('No hay conexión con el servidor.');
    }
    setCargando(false);
  };

  const salir = async () => {
    try { await cerrarSesion(); } catch (e) {}
    await borrarToken();
    setNombre('');
    setMensaje('');
    setPantalla('login');
  };

  if (pantalla === 'cargando') {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0f766e" />
      </View>
    );
  }

  if (pantalla === 'inicio') {
    return <HomeScreen nombre={nombre || 'de nuevo'} onSalir={salir} />;
  }

  if (pantalla === 'privacidad') {
    return (
      <PrivacyScreen
        cargando={cargando}
        mensaje={mensaje}
        onAceptar={enviarRegistro}
        onVolver={() => { setMensaje(''); setPantalla('registro'); }}
      />
    );
  }

  if (pantalla === 'registro') {
    return (
      <RegisterScreen
        onContinuar={(d) => { setDatos(d); setPantalla('privacidad'); }}
        onIrLogin={() => { setMensaje(''); setPantalla('login'); }}
      />
    );
  }

  return (
    <LoginScreen
      cargando={cargando}
      mensaje={mensaje}
      onEntrar={entrar}
      onIrRegistro={() => { setMensaje(''); setPantalla('registro'); }}
    />
  );
}