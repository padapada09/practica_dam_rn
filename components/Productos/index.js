import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import { StoreContext } from '../../context/storeContext';
import Producto from './Producto';
import Filter from './Filter';
import { useMemo } from 'react';

const Productos = (props) => {
  const {productos} = useContext(StoreContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBuyers, setSelectedBuyers] = useState([]);
  const filteredProducts = useMemo(() => productos.list.filter(p => {
    if (selectedBuyers.length === 0 && selectedCategories.length === 0) return true;
    if (p.categorias.some(c => selectedCategories.includes(c))) return true;
    if (p.compradores.some(c => selectedBuyers.includes(c))) return true;
  }),[selectedBuyers,selectedCategories,productos]);

  return (
    <View style={styles.container}>
      <FlatList 
        data={filteredProducts}
        ListHeaderComponent={() => 
          <Filter
            selectedBuyers={selectedBuyers}
            selectedCategories={selectedCategories}
            setSelectedBuyers={setSelectedBuyers}
            setSelectedCategories={setSelectedCategories}
          />
        }
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
