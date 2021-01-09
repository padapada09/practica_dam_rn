import { Button } from '@ui-kitten/components';
import React from 'react';
import { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StoreContext } from '../../context/storeContext';
import Comprador from './Comprador';

const Compradores = () => {
    const {compradores, setCompradores} = useContext(StoreContext);

    return (
        <View style={styles.container}>
            <FlatList 
                data={compradores}
                renderItem={props => <Comprador {...props}/>}
                ListFooterComponent={() => 
                    <Button 
                    onPress={() => setCompradores(prev => [...prev, {id: (Math.random()*99999999).toString()}])}
                    style={styles.button}>
                        Nuevo comprador
                    </Button>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        margin: 20
    }
});

export default Compradores;