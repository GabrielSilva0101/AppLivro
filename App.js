import React from 'react';
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home as HomeIcon, Library, FileText, User } from 'lucide-react-native';

// Importação das Telas
import Home from './src/telas/Home';
import Biblioteca from './src/telas/Biblioteca';
import AddLivro from './src/telas/AddLivro';
import DetalhesLivro from './src/telas/DetalhesLivro';
import Anota from './src/telas/Anota';
import ListaAnotacoes from './src/telas/ListaAnotacoes';
import Perfil from './src/telas/Perfil';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function BarraFlutuante({ state, descriptors, navigation }) {
  return (
    <View style={styles.barraFlutuante}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };


        let Icone;
        if (route.name === 'Home') Icone = HomeIcon;
        else if (route.name === 'Biblioteca') Icone = Library;
        else if (route.name === 'ListaAnotacoes') Icone = FileText;
        else if (route.name === 'Perfil') Icone = User;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.botaoTab, isFocused && styles.botaoTabAtivo]}
          >
            <Icone size={24} color={isFocused ? '#FFF' : '#8A8F88'} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BarraFlutuante {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Biblioteca" component={Biblioteca} />
      <Tab.Screen name="ListaAnotacoes" component={ListaAnotacoes} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <View style={styles.containerPrincipal}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="MainTabs" component={TabNavigator} />


          <Stack.Screen name="AddLivro" component={AddLivro} />
          <Stack.Screen name="DetalhesLivro" component={DetalhesLivro} />
          <Stack.Screen name="Anota" component={Anota} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#F5F2EB',
    ...(Platform.OS === 'web' ? {
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    } : {}),


  },

  barraFlutuante: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    height: 72,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 36,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,


    elevation: 10,
    shadowColor: '#4F6856',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,


    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',


    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(12px)' } : {}),
  },

  botaoTab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  botaoTabAtivo: {
    backgroundColor: '#5F7564',
    shadowColor: '#5F7564',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  }
});