import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

/**
 * @typedef {{
 *  id: string
 *  nombre: string
 *  color: string
 * }} Categoria
 * 
 * @param {{
 *  item: Categoria
 *  index: number,
 *  onToggle: (state: boolean) => void
 *  selected: boolean
 * }} props
 */
const Categoria = ({item, index, selected, onToggle}) => {
    
    return (
        <TouchableOpacity 
        onPress={() => onToggle(!Boolean(selected))}
        style={[
            styles.container,
            !index && {marginTop: 20}
        ]}>
            <Text>
                {item.nombre} - {selected ? `Seleccionada` : `No seleccionada`}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 2
    }
});

export default Categoria;