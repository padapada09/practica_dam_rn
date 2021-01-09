import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, View } from 'react-native';
import { StoreContext } from '../../context/storeContext';
import Comprador from './Comprador';

/**
 * Mostrar, agregar, o quitar, 
 * compradores de un item.
 * 
 * @typedef {{
 *  id: string
 *  title: string
 *  price: string
 *  compradores: string[]
 * }} Producto
 * 
 * @param {{
 *  item?: Producto
 *  onDismiss: () => void
 * }} props
 */
const Compradores = ({item, onDismiss}) => {
    const context = useContext(StoreContext);
    const Item = useCallback(props => 
        <Comprador 
            {...props}
            selected={item.compradores.includes(props.item.id)}
            onToggle={added => {
                if (added) context.productos.addBuyerToProduct(item.id,props.item.id);
                else context.productos.removeBuyerFromProduct(item.id,props.item.id);
            }}
        />
    ,[context,item]);
    
    return (
        <Modal 
        transparent
        visible={Boolean(item)}
        animationType="slide">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{flex: 1, marginRight: 10}}>
                        Compradores de {item?.title}
                    </Text>
                    <Button
                    onPress={onDismiss}>
                        x
                    </Button>
                </View>
                <FlatList 
                    data={context.compradores}
                    renderItem={Item}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 50
    },
    container: {
        position: 'absolute',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: 'white',
        padding: 10,
        bottom: 0,
        left: 0,
        width: Dimensions.get("window").width
    }
});

export default Compradores;