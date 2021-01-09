import React from 'react';
import { Card, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const CategoryItem = ({item, onPress}) => {
    return (
        <Card
        onPress={onPress}
        style={[styles.card, {backgroundColor: item.color}]}
        key={item.id}>
            <Text style={styles.cardText}>
                {item.nombre}
            </Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1, 
        margin: 5
    },
    cardText: {
        textAlign: 'center', 
        fontWeight: 'bold'
    }
});

export default CategoryItem;