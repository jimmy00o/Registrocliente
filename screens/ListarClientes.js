import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const ListarClientes = ({ clientes }) => {
  const [listaClientes, setListaClientes] = useState([]);

  useEffect(() => {
    if (clientes) {
      setListaClientes(clientes);
    }
  }, [clientes]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Lista de Clientes</Text>
      {listaClientes.length > 0 ? (
        listaClientes.map((cliente, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>Cédula: <Text style={styles.value}>{cliente.cedula}</Text></Text>
            <Text style={styles.label}>Nombres: <Text style={styles.value}>{cliente.nombre}</Text></Text>
            <Text style={styles.label}>Apellidos: <Text style={styles.value}>{cliente.apellidos}</Text></Text>
            <Text style={styles.label}>Fecha de nacimiento: <Text style={styles.value}>{cliente.fechaNacimiento}</Text></Text>
            <Text style={styles.label}>Sexo: <Text style={styles.value}>{cliente.sexo}</Text></Text>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>No hay clientes registrados.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minHeight: height,
    backgroundColor: '#E7F6E7',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#31B057',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#C8E6C9',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 4,
    fontWeight: '600',
  },
  value: {
    fontWeight: 'normal',
    color: '#2E7D32',
  },
  noData: {
    color: '#777',
    fontSize: 16,
    marginTop: 20,
  },
});

export default ListarClientes;
