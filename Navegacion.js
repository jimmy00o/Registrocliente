import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuardarCliente from './screens/GuardarCliente';
import ListarClientes from './screens/ListarClientes';

const Stack = createNativeStackNavigator();

export default function Navegacion() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListarClientes">
        <Stack.Screen 
          name="ListarClientes" 
          component={ListarClientes} 
          options={{ title: 'Listar de Clientes' }}
        />
        <Stack.Screen 
          name="GuardarCliente" 
          component={GuardarCliente}
          options={{ title: 'Registrar Cliente' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}