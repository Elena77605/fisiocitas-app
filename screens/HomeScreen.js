import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ nombre, onSalir }) {
  return (
    <View style={s.contenedor}>
      <Text style={s.titulo}>¡Bienvenida, {nombre}!</Text>
      <Text style={s.subtitulo}>Has iniciado sesión en FisioCitas</Text>

      <View style={s.menu}>
        <View style={s.tarjeta}><Text style={s.tarjetaTexto}>Pacientes</Text></View>
        <View style={s.tarjeta}><Text style={s.tarjetaTexto}>Citas</Text></View>
        <View style={s.tarjeta}><Text style={s.tarjetaTexto}>Sesiones</Text></View>
      </View>

      <Text style={s.nota}>Estos módulos se desarrollan en los siguientes sprints.</Text>

      <TouchableOpacity style={s.boton} onPress={onSalir}>
        <Text style={s.botonTexto}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: { flex: 1, padding: 24, paddingTop: 80 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#0f766e' },
  subtitulo: { fontSize: 15, color: '#555', marginBottom: 24 },
  menu: { gap: 12 },
  tarjeta: {
    backgroundColor: '#e6f4f1', padding: 18, borderRadius: 10,
    borderWidth: 1, borderColor: '#0f766e',
  },
  tarjetaTexto: { fontSize: 17, fontWeight: '600', color: '#0f766e' },
  nota: { color: '#777', fontSize: 13, marginTop: 16 },
  boton: {
    backgroundColor: '#dc2626', padding: 14, borderRadius: 8,
    alignItems: 'center', marginTop: 30,
  },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});