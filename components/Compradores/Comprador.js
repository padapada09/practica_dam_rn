import React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@ui-kitten/components';
import { StoreContext } from '../../context/storeContext';

const Comprador = ({item, index}) => {
    const {setCompradores} = useContext(StoreContext);

    function onNameChange(name) {
        setCompradores(prev => prev.map(comprador => {
            if (comprador.id === item.id) return {...comprador, nombre: name};
            else return comprador;
        }));
    };

    function onEmailChange(email) {
        setCompradores(prev => prev.map(comprador => {
            if (comprador.id === item.id) return {...comprador, email: email};
            else return comprador;
        }));
    };

    return (
        <View style={[styles.comprador, !index && {marginTop: 20}]}>
            <Text style={styles.title}>
                Nombre
            </Text>
            <TextInput 
                value={item.nombre}
                style={styles.textInput}
                onChangeText={onNameChange}
            />
            <Text style={styles.title}>
                Email
            </Text>
            <TextInput 
                value={item.email}
                style={styles.textInput}
                onChangeText={onEmailChange}
            />
            <View style={styles.actions}>
                <Button 
                onPress={() => setCompradores(prev => prev.filter(c => c.id !== item.id))}
                style={{flex: 1, backgroundColor: 'red', borderColor: 'red'}}>
                    Eliminar
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    comprador: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20
    },
    title: {
        paddingLeft: 5,
        marginTop: 5
    },
    textInput: {
        paddingLeft: 20,
        margin: 5,
        backgroundColor: 'lightgray',
        borderRadius: 5
    },
    actions: {
        padding: 5,
        flexDirection: 'row'
    }
});

export default Comprador;