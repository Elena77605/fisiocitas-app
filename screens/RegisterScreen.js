import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';

// Validaciones (principio 1: longitud, tipo y formato)
const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s.]+$/;
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(d) {
  const e = {};
  if (!d.nombre.trim()) e.nombre = 'El nombre es obligatorio';
  else if (!REGEX_NOMBRE.test(d.nombre)) e.nombre = 'Solo letras, espacios y puntos';
  else if (d.nombre.length > 100) e.nombre = 'Máximo 100 caracteres';

  if (!d.correo.trim()) e.correo = 'El correo es obligatorio';
  else if (!REGEX_CORREO.test(d.correo)) e.correo = 'Correo no válido';

  if (!/^\d{10}$/.test(d.telefono)) e.telefono = 'Debe tener exactamente 10 dígitos';

  if (d.password.length < 8) e.password = 'Mínimo 8 caracteres';
  else if (d.password.length > 64) e.password = 'Máximo 64 caracteres';

  if (d.confirmar !== d.password) e.confirmar = 'Las contraseñas no coinciden';
  return e;
}

function Campo({ etiqueta, valor, error, onChange, ...props }) {
  return (
    <View style={s.grupo}>
      <Text style={s.etiqueta}>{etiqueta}</Text>
      <TextInput
        style={[s.input, error && s.inputError]}
        value={valor}
        onChangeText={onChange}
        autoCapitalize="none"
        {...props}
      />
      {error ? <Text style={s.error}>{error}</Text> : null}
    </View>
  );
}

export default function RegisterScreen({ onContinuar, onIrLogin }) {
  const [datos, setDatos] = useState({
    nombre: '', correo: '', telefono: '', password: '', confirmar: '',
  });
  const [errores, setErrores] = useState({});

  const cambiar = (campo, valor) => setDatos({ ...datos, [campo]: valor });

  const continuar = () => {
    const e = validar(datos);
    setErrores(e);
    if (Object.keys(e).length === 0) onContinuar(datos);
  };

  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.contenedor} keyboardShouldPersistTaps="handled">
        <Text style={s.titulo}>Crear cuenta</Text>
        <Text style={s.subtitulo}>Registro del fisioterapeuta</Text>

                <Campo etiqueta="Nombre completo" valor={datos.nombre} error={errores.nombre}
               onChange={(v) => cambiar('nombre', v)} maxLength={100} autoCapitalize="words" />
               <Campo etiqueta="Correo electrónico" valor={datos.correo} error={errores.correo}
               onChange={(v) => cambiar('correo', v)} maxLength={100} keyboardType="email-address" />
               <Campo etiqueta="Teléfono (10 dígitos)" valor={datos.telefono} error={errores.telefono}
               onChange={(v) => cambiar('telefono', v)} maxLength={10} keyboardType="number-pad" />
              <Campo etiqueta="Contraseña (8 a 64 caracteres)" valor={datos.password} error={errores.password}
               onChange={(v) => cambiar('password', v)} maxLength={64} secureTextEntry />
              <Campo etiqueta="Confirmar contraseña" valor={datos.confirmar} error={errores.confirmar}
               onChange={(v) => cambiar('confirmar', v)} maxLength={64} secureTextEntry />

        <TouchableOpacity style={s.boton} onPress={continuar}>
          <Text style={s.botonTexto}>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onIrLogin}>
          <Text style={s.enlace}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  contenedor: { padding: 24, paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#0f766e' },
  subtitulo: { fontSize: 15, color: '#555', marginBottom: 20 },
  grupo: { marginBottom: 14 },
  etiqueta: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  input: {
    borderWidth: 1, borderColor: '#bbb', borderRadius: 8,
    padding: 12, fontSize: 16, backgroundColor: '#fff',
  },
  inputError: { borderColor: '#dc2626' },
  error: { color: '#dc2626', fontSize: 13, marginTop: 4 },
  boton: {
    backgroundColor: '#0f766e', padding: 14, borderRadius: 8,
    alignItems: 'center', marginTop: 10,
  },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  enlace: { color: '#0f766e', textAlign: 'center', marginTop: 18, fontSize: 15 },
});