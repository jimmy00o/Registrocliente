import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrarCliente from './screens/RegistrarCliente';
import ListarClientes from './screens/ListarClientes';

const Stack = createStackNavigator();

const App = () => {
  const [clientes, setClientes] = useState([]);

  const agregarCliente = (nuevoCliente) => {
    setClientes((prevClientes) => [...prevClientes, nuevoCliente]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistrarCliente">
        <Stack.Screen name="RegistrarCliente">
          {(props) => <RegistrarCliente {...props} agregarCliente={agregarCliente} />}
        </Stack.Screen>
        <Stack.Screen name="ListarClientes">
          {(props) => <ListarClientes {...props} clientes={clientes} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
