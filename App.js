/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {StoreProvider} from './context/storeContext';
import {ListaCategorias} from './components/ListaCategorias';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Compradores from './components/Compradores';
import Productos from './components/Productos';
import Producto from './components/Producto';
import { Home } from './components/Home';

const Stack = createStackNavigator();

export const screens = {
  productos: 'productos',
  producto: 'producto',
  home: 'home',
  categorias: 'categorias',
  compradores: "compradores"
};

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <StoreProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator initialRouteName={screens.homepage}>
            <Stack.Screen
              name={screens.home}
              options={{headerShown: false}}
              component={Home}
            />
            <Stack.Screen 
              name={screens.productos} 
              component={Productos} 
            />
            <Stack.Screen 
              name={screens.producto} 
              component={Producto} 
            />
            <Stack.Screen 
              name={screens.categorias} 
              component={ListaCategorias}
            />
            <Stack.Screen 
              name={screens.compradores} 
              component={Compradores}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
