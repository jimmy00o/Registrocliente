import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function GuardarCliente({ navigation, route }) {
  const { agregarNuevoCliente } = route.params;
  const [cliente, setCliente] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    fechaN: '',
    sexo: ''
  });

  const validarCampos = () => {
    if (!cliente.cedula || !cliente.nombres || !cliente.apellidos) {
      Alert.alert('Error', 'Cédula, nombres y apellidos son obligatorios');
      return false;
    }
    return true;
  };

  const guardar = () => {
    if (!validarCampos()) return;

    agregarNuevoCliente(cliente);
    Alert.alert('Éxito', 'Cliente registrado correctamente');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.titulo}>Registro de datos del cliente</Text>

        <Text style={styles.label}>Cédula:</Text>
        <TextInput
          style={styles.input}
          value={cliente.cedula}
          placeholder="Ej: 365-220904-1012A"
          onChangeText={(text) => setCliente({ ...cliente, cedula: text })}
        />

        <Text style={styles.label}>Nombres:</Text>
        <TextInput
          style={styles.input}
          value={cliente.nombres}
          placeholder="Ej: Juan Carlos"
          onChangeText={(text) => setCliente({ ...cliente, nombres: text })}
        />

        <Text style={styles.label}>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={cliente.apellidos}
          placeholder="Ej: Perez Lopez"
          onChangeText={(text) => setCliente({ ...cliente, apellidos: text })}
        />

        <Text style={styles.label}>Fecha Nacimiento:</Text>
        <TextInput
          style={styles.input}
          value={cliente.fechaN}
          placeholder="DD/MM/AAAA"
          onChangeText={(text) => setCliente({ ...cliente, fechaN: text })}
        />

        <Text style={styles.label}>Sexo:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={cliente.sexo}
            onValueChange={(value) => setCliente({ ...cliente, sexo: value })}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione..." value="" />
            <Picker.Item label="Femenino" value="Femenino" />
            <Picker.Item label="Masculino" value="Masculino" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.boton} onPress={guardar}>
          <Text style={styles.textoBoton}>Guardar Cliente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    maxWidth: 450,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2E7D32',
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#81C784',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#81C784',
    borderRadius: 8,
    marginBottom: 25,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    fontSize: 18,
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

