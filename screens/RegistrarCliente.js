import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { height } = Dimensions.get('window');

const RegistrarCliente = ({ navigation, agregarCliente }) => {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');

  const guardarCliente = () => {
    if (!cedula || !nombre) {
      Alert.alert('Error', 'Cédula y Nombre son campos obligatorios');
      return;
    }

    const nuevoCliente = {
      cedula,
      nombre,
      apellidos,
      fechaNacimiento,
      sexo,
    };

    agregarCliente(nuevoCliente);
    Alert.alert('Éxito', 'Cliente registrado correctamente');

    // Limpiar campos
    setCedula('');
    setNombre('');
    setApellidos('');
    setFechaNacimiento('');
    setSexo('');

    // Redirigir a la lista
    navigation.navigate('ListarClientes');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Registro de Datos del cliente</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cédula:</Text>
          <TextInput
            style={styles.input}
            value={cedula}
            onChangeText={setCedula}
            placeholder="Ej: 365-130995-0002H"
            placeholderTextColor="#B2BEB5"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej: Juan Carlos"
            placeholderTextColor="#B2BEB5"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Apellidos:</Text>
          <TextInput
            style={styles.input}
            value={apellidos}
            onChangeText={setApellidos}
            placeholder="Ej: Pérez López"
            placeholderTextColor="#B2BEB5"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fecha de Nacimiento:</Text>
          <TextInput
            style={styles.input}
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#B2BEB5"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sexo:</Text>
          <Picker
            selectedValue={sexo}
            onValueChange={(itemValue) => setSexo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione..." value="" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.buttonPrimary} onPress={guardarCliente}>
          <Text style={styles.buttonText}>Guardar Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonSecondary} 
          onPress={() => navigation.navigate('ListarClientes')}
        >
          <Text style={styles.buttonText}>Listar Clientes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minHeight: height,
    backgroundColor: '#E7F6E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    maxWidth: 400,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#31B057',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    fontWeight: '600',
  },
  input: {
    height: 55,
    borderColor: '#31B057',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 55,
    borderColor: '#31B057',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  buttonPrimary: {
    backgroundColor: '#31B057',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonSecondary: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default RegistrarCliente;
