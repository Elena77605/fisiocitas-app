import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';

export default function LoginScreen({ onEntrar, onIrRegistro, cargando, mensaje }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const entrar = () => {
    if (!correo.trim() || !password) {
      setError('Escribe tu correo y tu contraseña');
      return;
    }
    setError('');
    onEntrar(correo.trim(), password);
  };

  return (
    <View style={s.contenedor}>
      <Text style={s.titulo}>Iniciar sesión</Text>
      <Text style={s.subtitulo}>FisioCitas</Text>

      <Text style={s.etiqueta}>Correo electrónico</Text>
      <TextInput
        style={s.input}
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
        maxLength={100}
      />

      <Text style={s.etiqueta}>Contraseña</Text>
      <TextInput
        style={s.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        maxLength={64}
      />

      {error || mensaje ? <Text style={s.error}>{error || mensaje}</Text> : null}

      <TouchableOpacity style={s.boton} onPress={entrar} disabled={cargando}>
        {cargando
          ? <ActivityIndicator color="#fff" />
          : <Text style={s.botonTexto}>Entrar</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={onIrRegistro}>
        <Text style={s.enlace}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: { flex: 1, padding: 24, paddingTop: 80 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#0f766e' },
  subtitulo: { fontSize: 15, color: '#555', marginBottom: 24 },
  etiqueta: { fontSize: 14, fontWeight: '600', marginBottom: 4, marginTop: 10 },
  input: {
    borderWidth: 1, borderColor: '#bbb', borderRadius: 8,
    padding: 12, fontSize: 16, backgroundColor: '#fff',
  },
  error: { color: '#dc2626', marginTop: 12, fontSize: 14 },
  boton: {
    backgroundColor: '#0f766e', padding: 14, borderRadius: 8,
    alignItems: 'center', marginTop: 20,
  },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  enlace: { color: '#0f766e', textAlign: 'center', marginTop: 18, fontSize: 15 },
});