import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AddLivro from './src/telas/AddLivro';
import Anota from './src/telas/Anota';
import Biblioteca from './src/telas/Biblioteca';
import DetalhesLivro from './src/telas/DetalhesLivro';
import Home from './src/telas/Home';
import Perfil from './src/telas/Perfil';
import ListaAnotacoes from './src/telas/ListaAnotacoes';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Início' }} />
        <Stack.Screen name="Biblioteca" component={Biblioteca} options={{ title: 'Minha Biblioteca' }} />
        <Stack.Screen name="DetalhesLivro" component={DetalhesLivro} options={{ title: 'Sobre o Livro' }} />
        <Stack.Screen name="AddLivro" component={AddLivro} options={{ title: 'Novo Livro' }} />
        <Stack.Screen name="Anota" component={Anota} options={{ title: 'Minhas Notas' }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Meu Perfil' }} />
        <Stack.Screen name="ListaAnotacoes" component={ListaAnotacoes} options={{title: 'Notas'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}