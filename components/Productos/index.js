import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import { StoreContext } from '../../context/storeContext';
import Producto from './Producto';

const Productos = (props) => {
  const {productos} = useContext(StoreContext);

  return (
    <View style={styles.container}>
      <FlatList 
        data={productos.list}
        renderItem={props => <Producto {...props}/>}
        ListEmptyComponent={() => <Text style={styles.loader}>Cargando...</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    alignSelf: 'center',
    paddingVertical: 20,
  }
});

export default Productos;
