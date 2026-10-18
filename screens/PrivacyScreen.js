import { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator,
} from 'react-native';

export default function PrivacyScreen({ onAceptar, onVolver, cargando, mensaje }) {
  const [acepto, setAcepto] = useState(false);

  return (
    <View style={s.contenedor}>
      <Text style={s.titulo}>Aviso de privacidad</Text>

      <ScrollView style={s.caja}>
        <Text style={s.texto}>
          <Text style={s.negrita}>Responsable: </Text>
          FisioCitas, desarrollada por Rosa Elena Martínez Romo, Universidad
          Tecnológica de Aguascalientes.{'\n\n'}

          <Text style={s.negrita}>Datos que se recaban: </Text>
          nombre, correo electrónico, teléfono y contraseña (almacenada de forma
          cifrada). Posteriormente la aplicación permitirá registrar datos de
          pacientes, incluidos datos de salud (datos personales sensibles), que
          serán responsabilidad del fisioterapeuta usuario.{'\n\n'}

          <Text style={s.negrita}>Finalidades: </Text>
          crear y administrar su cuenta, permitir el acceso a la aplicación y
          gestionar pacientes, citas y sesiones del consultorio.{'\n\n'}

          <Text style={s.negrita}>Transferencias: </Text>
          sus datos no se compartirán con terceros, salvo obligación legal.{'\n\n'}

          <Text style={s.negrita}>Derechos ARCO: </Text>
          usted puede solicitar el acceso, rectificación, cancelación u oposición
          al tratamiento de sus datos enviando un correo a: emtz51044@gmail.com.{'\n\n'}

          <Text style={s.negrita}>Cambios al aviso: </Text>
          cualquier modificación se notificará dentro de la aplicación.{'\n\n'}

          <Text style={s.negrita}>Versión 1.0</Text>
        </Text>
      </ScrollView>

      <TouchableOpacity style={s.fila} onPress={() => setAcepto(!acepto)}>
        <View style={[s.casilla, acepto && s.casillaMarcada]}>
          {acepto ? <Text style={s.palomita}>✓</Text> : null}
        </View>
        <Text style={s.textoCasilla}>He leído y acepto el aviso de privacidad</Text>
      </TouchableOpacity>

      {mensaje ? <Text style={s.error}>{mensaje}</Text> : null}

      <TouchableOpacity
        style={[s.boton, !acepto && s.botonBloqueado]}
        disabled={!acepto || cargando}
        onPress={onAceptar}
      >
        {cargando
          ? <ActivityIndicator color="#fff" />
          : <Text style={s.botonTexto}>Registrarme</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={onVolver}>
        <Text style={s.enlace}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: { flex: 1, padding: 24, paddingTop: 60 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#0f766e', marginBottom: 14 },
  caja: {
    flex: 1, borderWidth: 1, borderColor: '#bbb', borderRadius: 8,
    padding: 14, backgroundColor: '#fafafa',
  },
  texto: { fontSize: 14, lineHeight: 21, color: '#222' },
  negrita: { fontWeight: 'bold' },
  fila: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  casilla: {
    width: 26, height: 26, borderWidth: 2, borderColor: '#0f766e',
    borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  casillaMarcada: { backgroundColor: '#0f766e' },
  palomita: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  textoCasilla: { flex: 1, fontSize: 15 },
  error: { color: '#dc2626', marginTop: 10, fontSize: 14 },
  boton: {
    backgroundColor: '#0f766e', padding: 14, borderRadius: 8,
    alignItems: 'center', marginTop: 14,
  },
  botonBloqueado: { backgroundColor: '#9ca3af' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  enlace: { color: '#0f766e', textAlign: 'center', marginTop: 14, fontSize: 15 },
});