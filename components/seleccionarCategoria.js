import {CheckBox, Divider, List, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../context/storeContext';

const styles = StyleSheet.create({
  chip: {width: 30, height: 10, borderRadius: 10},
  list: {backgroundColor: 'transparent', marginTop: 10},
  item: {paddingVertical: 20},
});

const SeleccionarCategoria = ({producto}) => {
  const context = useContext(StoreContext);
  const categorias = producto.categorias;

  const renderItem = ({item, index}) => {
    const categoria = item;

    const renderColor = (color) => {
      return (
        <View
          style={[
            styles.chip,
            {
              backgroundColor: color,
            },
          ]}
        />
      );
    };

    const categoriaAsignada = categorias
      .map((c) => c.id)
      .includes(categoria.id);

    return (
      <View style={styles.item}>
        <CheckBox
          status="primary"
          checked={categoriaAsignada}
          onChange={() => {
            if (!categoriaAsignada) {
              context.productos.addCategoryToProduct(producto.id,categoria.id);
            } else {
              context.productos.removeCategoryFromProduct(producto.id,categoria.id);
            }
          }}>
          <Text category="s1">
            {categoria.nombre}
            {'    '}
            {renderColor(categoria.color)}
          </Text>
        </CheckBox>
      </View>
    );
  };

  return (
    <List
      style={styles.list}
      data={categorias}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

export default SeleccionarCategoria;
