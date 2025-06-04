import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

// Componente principal
export default function GuardarCliente({ navigation, route }) {
  // Obtenemos la función de guardar y el cliente a editar (si existe)
  const { agregarNuevoCliente, clienteEditar } = route.params;

  // Estado del cliente ( esta vacío por defecto)
  const [cliente, setCliente] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    fechaN: '',
    sexo: ''
  });

  // Cuando el componente carga, si hay un cliente para editar, lo cargamos
  useEffect(() => {
    if (clienteEditar) {
      // Establecemos todos los campos del cliente a editar para que lleve un orden. cambie la estructura anterior
      setCliente({
        cedula: clienteEditar.cedula,
        nombres: clienteEditar.nombres,
        apellidos: clienteEditar.apellidos,
        fechaN: clienteEditar.fechaN,
        sexo: clienteEditar.sexo
      });
    }
  }, []);

  // esto  Valida que no haya campos vacíos
  const validarCampos = () => {
    if (!cliente.cedula || !cliente.nombres || !cliente.apellidos) {
      Alert.alert('Error', 'Cédula, nombres y apellidos son obligatorios');
      return false;
    }
    return true;
  };

  // Guarda o actualiza el clientes seleccionados 
  const guardar = () => {
    if (!validarCampos()) return;

    agregarNuevoCliente(cliente); //  esto Guarda en Firebase
    Alert.alert('Éxito', clienteEditar ? 'Cliente actualizado correctamente' : 'Cliente registrado correctamente');
    navigation.goBack(); // Volver a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* Título dinámico */}
        <Text style={styles.titulo}>
          {clienteEditar ? 'Editar Cliente' : 'Registro de datos del cliente'}
        </Text>

        {/* Campo: este apartado es para  Cédula  se desabilite si estamos editando */}
        <Text style={styles.label}>Cédula:</Text>
        <TextInput
          style={styles.input}
          value={cliente.cedula}
          editable={!clienteEditar}
          placeholder="Ej: 365-220904-1012A"
          onChangeText={(text) => setCliente({ ...cliente, cedula: text })}
        />

        {/* Campo: Nombres */}
        <Text style={styles.label}>Nombres:</Text>
        <TextInput
          style={styles.input}
          value={cliente.nombres}
          placeholder="Ej: Juan Carlos"
          onChangeText={(text) => setCliente({ ...cliente, nombres: text })}
        />

        {/* Campo: Apellidos */}
        <Text style={styles.label}>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={cliente.apellidos}
          placeholder="Ej: Perez Lopez"
          onChangeText={(text) => setCliente({ ...cliente, apellidos: text })}
        />

        {/* Campo: Fecha de Nacimiento */}
        <Text style={styles.label}>Fecha Nacimiento:</Text>
        <TextInput
          style={styles.input}
          value={cliente.fechaN}
          placeholder="DD/MM/AAAA"
          onChangeText={(text) => setCliente({ ...cliente, fechaN: text })}
        />

        {/* Campo: Sexo */}
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

        {/* Botón dinámico: Guardar o Actualizar */}
        <TouchableOpacity style={styles.boton} onPress={guardar}>
          <Text style={styles.textoBoton}>
            {clienteEditar ? 'Actualizar Cliente' : 'Guardar Cliente'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos del formulario
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


