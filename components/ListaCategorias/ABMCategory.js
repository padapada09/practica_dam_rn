import React from 'react';
import { Dimensions, Modal, StyleSheet, View } from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import {TextInput, TouchableOpacity} from 'react-native';
import {ColorPicker, fromHsv, toHsv} from 'react-native-color-picker';
import { useState } from 'react';
import { useEffect } from 'react';

/**
 * 
 * @typedef {{
 *  id?: string
 *  nombre?: string, 
 *  color?: string
 * }} Category
 * 
 * @param {{
 *  category?: Category,
 *  onSave: (category: Category) => void,
 *  onClose: () => void
 * }} props 
 */
const ABMCategory = ({category, onSave, onClose}) => {
    const [id, setId] = useState(``);
    const [nombre, setNombre] = useState(``);
    const [color, setColor] = useState(``);

    useEffect(() => {
        setId(category?.id);
        setNombre(category?.nombre);
        setColor(category?.color || "blue");
    },[category]);

    return (
        <Modal 
        transparent
        visible={Boolean(category)}
        animationType="slide">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        ABM de Categoría
                    </Text>
                    <TouchableOpacity 
                    onPress={onClose}
                    style={styles.closeButton}>
                        <Text style={{fontSize: 20}}>
                            ❌
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder="Nombre de Categoria"
                    style={styles.textInput}
                    value={nombre}
                    onChangeText={setNombre}
                />
                <ColorPicker
                    hideSliders={true}
                    color={toHsv(color)}
                    onColorChange={color => setColor(fromHsv(color))}
                    style={{height: 200, marginVertical: 20}}
                />
                <Button 
                onPress={() => onSave({id, nombre, color})}
                style={styles.modalButton}>
                    Guardar
                </Button>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        elevation: 6,
        padding: 10,
        backgroundColor: 'white',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        height: 'auto',
        width: Dimensions.get("window").width
    },
    closeButton: {
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    textInput: {
        backgroundColor: 'gray',
        borderRadius: 5,
        color: 'white',
        paddingLeft: 15,
        marginBottom: 10
    },
    header: {
        alignItems: 'center', 
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        flex: 1,
        paddingLeft: 10
    }
});

export default ABMCategory;