import React from 'react';
import { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { StoreContext } from '../../context/storeContext';

const Filter = ({
    selectedCategories,
    selectedBuyers,
    setSelectedCategories,
    setSelectedBuyers
}) => {
    const context = useContext(StoreContext);
    
    return (
        <View style={styles.container}>
            {   context.categorias.map(categoria => (
                    <TouchableOpacity 
                    onPress={() => setSelectedCategories(prev => {
                        if (selectedCategories.includes(categoria.id)) return prev.filter(c => c !== categoria.id);
                        else return [...prev, categoria.id];
                    })}
                    style={[
                        styles.selectable, 
                        {backgroundColor: categoria.color},
                        selectedCategories.includes(categoria.id) && {opacity: 1}
                    ]}>
                        <Text>
                            {categoria.nombre}
                        </Text>                    
                    </TouchableOpacity>
            ))}
            {   context.compradores.map(comprador => (
                    <TouchableOpacity 
                    onPress={() => setSelectedBuyers(prev => {
                        if (selectedBuyers.includes(comprador.id)) return prev.filter(c => c !== comprador.id);
                        else return [...prev, comprador.id];
                    })}
                    style={[
                        styles.selectable,
                        selectedBuyers.includes(comprador.id) && {opacity: 1}
                    ]}>
                        <Text>
                            {comprador.nombre}
                        </Text>                    
                    </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    selectable: {
        width: 100,
        height: 50,
        backgroundColor: 'red',
        margin: 10,
        borderRadius: 5,
        opacity: 0.5
    }
});

export default Filter;