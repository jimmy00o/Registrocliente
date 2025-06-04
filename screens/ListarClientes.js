import { StyleSheet, View, FlatList, Alert, TouchableOpacity, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { collection, getFirestore, query, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import appFirebase from '../Firebase';

const db = getFirestore(appFirebase);

export default function ListarClientes({ navigation }) {
  const [clientes, setClientes] = useState([]);
  
  //  Estado para el texto ingresado en la barra de búsqueda
  const [busqueda, setBusqueda] = useState('');
  
  //   este es el Estado que contiene la lista filtrada de clientes
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  useEffect(() => {
    LeerDatos();
  }, []);

  const LeerDatos = async () => {
    const q = query(collection(db, "clientes"));
    const querySnapshot = await getDocs(q);
    const d = [];
    querySnapshot.forEach((doc) => {
      const datosBD = doc.data();
      d.push(datosBD);
    });
    setClientes(d);
    
    // 🔹 Al cargar los datos por primera vez, también se llena la lista filtrada
    setClientesFiltrados(d);
  };

  const eliminarCliente = (index) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar este cliente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            await deleteDoc(doc(db, "clientes", index));
            LeerDatos(); // 🔄 Recarga la lista actualizada
          }
        }
      ]
    );
  };

  const agregarNuevoCliente = async (nuevo) => {
    await setDoc(doc(db, "clientes", nuevo.cedula), nuevo);
    LeerDatos();
  };

  // 🔹  esta es la Función que filtra los clientes con base en el texto ingresado
  const filtrarClientes = (texto) => {
    setBusqueda(texto); // Guarda lo que se escribe
    if (texto.trim() === '') {
      // Si está vacío, muestra todos
      setClientesFiltrados(clientes);
    } else {
      //  Convierte el texto a minúsculas y filtra por coincidencia
      const textoMin = texto.toLowerCase();
      const filtrado = clientes.filter((cliente) =>
        cliente.cedula.toLowerCase().includes(textoMin) ||
        cliente.nombres.toLowerCase().includes(textoMin) ||
        cliente.apellidos.toLowerCase().includes(textoMin)||
        cliente.FechaN.toLowerCase().includes(textoMin)
      );
      setClientesFiltrados(filtrado);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista de Clientes</Text>
        <TouchableOpacity
          style={styles.botonAgregar}
          onPress={() => navigation.navigate('GuardarCliente', { agregarNuevoCliente })}
        >
          <Entypo name="add-user" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/*  TextInput de búsqueda */}
      <TextInput
        style={styles.barraBusqueda}
        placeholder="Buscar cliente por nombre, apellido o cédula..."
        value={busqueda}
        onChangeText={filtrarClientes} //  Aplica el filtro al escribir
      />

      {/*  Si no hay resultados filtrados */}
      {clientesFiltrados.length === 0 ? (
        <Text style={styles.mensaje}>No hay clientes registrados</Text>
      ) : (
        //  Mostrar la lista filtrada
        <FlatList
          data={clientesFiltrados} //  Ahora usa la lista filtrada
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>Cédula: <Text style={styles.valor}>{item.cedula}</Text></Text>
              <Text style={styles.label}>Nombres: <Text style={styles.valor}>{item.nombres}</Text></Text>
              <Text style={styles.label}>Apellidos: <Text style={styles.valor}>{item.apellidos}</Text></Text>
              <Text style={styles.label}>Fecha Nac.: <Text style={styles.valor}>{item.fechaN}</Text></Text>
              <Text style={styles.label}>Sexo: <Text style={styles.valor}>{item.sexo}</Text></Text>

              <TouchableOpacity
                style={styles.botonEliminar}
                onPress={() => eliminarCliente(item.cedula)}
              >
                <MaterialIcons name="delete-forever" size={24} color="red" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('GuardarCliente', {
                  agregarNuevoCliente,
                  clienteEditar: item
                })}
              >
                <MaterialIcons name='edit' size={30} color="#1976D2" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

//  ESTILO
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  botonAgregar: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderWidth: 5,
    borderColor: 'green',
    borderRadius: 10,
  },
  // 🔹 Estilo para la barra de búsqueda
  barraBusqueda: {
    height: 45,
    borderColor: '#81C784',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  mensaje: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#C8E6C9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    position: 'relative',
  },
  label: {
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  valor: {
    fontWeight: 'normal',
    color: '#2E7D32',
  },
  botonEliminar: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
});

