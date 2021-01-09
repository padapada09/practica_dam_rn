import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Card, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { screens } from '../../App';

/**
 * @typedef {{
 *  id: string,
 *  title: string,
 *  price: string,
 * }} Producto
 * 
 * @param {{item: Producto}} props
 */
const Producto = ({item: producto}) => {
    const navigation = useNavigation();

    return (
        <Card style={styles.card}>
            <View style={styles.tituloContainer}>
                <Text style={styles.titulo}>
                    {producto.title}
                </Text>
                <Text style={styles.precio}>
                    Precio: {producto.price}
                </Text>
            </View>
            <View style={styles.botonesContainer}>
                <Button 
                appearance="outline" 
                onPress={() => navigation.navigate(screens.producto,{productoId: producto.id})}>
                    Ver Detalles
                </Button>
                <Button status="success">
                    COMPRAR
                </Button>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    tituloContainer: {
      flexDirection: 'column',
      marginBottom: 10,
    },
    botonesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    titulo: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    precio: {
      fontSize: 15,
    },
    card: {
      marginHorizontal: 10,
      marginVertical: 5,
    },
});

export default Producto;