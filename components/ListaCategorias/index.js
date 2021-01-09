import React, {useContext, useState} from 'react';
import {Button} from '@ui-kitten/components';
import {StyleSheet, View, FlatList} from 'react-native';
import {StoreContext} from '../../context/storeContext';
import useOrientation, {SCREEN} from '../../hooks/useOrientation';
import CategoryItem from './CategoryItem';
import ABMCategory from './ABMCategory';

export const ListaCategorias = () => {
    const [selectedCategory, setSelectedCategory] = useState();
    const {categorias, setCategorias} = useContext(StoreContext);
    const screenDirection = useOrientation();

    const onSave = (category) => {
        if (category.id) { //Edit category
            setCategorias(prevCategories => prevCategories.map(prevCategory => {
                if (prevCategory.id === category.id) return category;
                else return prevCategory;
            }));
        } else { //Add Category
            setCategorias(prevCategories => [...prevCategories, {...category, id: Math.random()*999999}]);
        }
        setSelectedCategory(undefined);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categorias}
                key={screenDirection}
                numColumns={screenDirection === SCREEN.LANDSCAPE ? 4 : 2}
                renderItem={props => 
                    <CategoryItem 
                        {...props}
                        onPress={() => setSelectedCategory(props.item)}
                    />
                }
            />
            <Button
            style={styles.button}
            onPress={setSelectedCategory}>
                +
            </Button>
            <ABMCategory
                category={selectedCategory}
                onSave={onSave}
                onClose={() => setSelectedCategory(undefined)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1},
    button: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      zIndex: 999,
      borderRadius: 60,
      width: 60,
      height: 60,
    },
    modalView: {
      backgroundColor: 'lightgrey',
      paddingVertical: 10,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      height: '50%',
      padding: 10,
    },
    modalContainer: {
      flex: 1,
      flexDirection: 'column-reverse',
    },
    textInput: {
      height: 40,
      borderColor: 'blue',
      borderWidth: 2,
      borderRadius: 20,
      paddingHorizontal: 10,
      backgroundColor: 'lightgrey',
      marginVertical: 10,
    },
    modalButton: {
      marginVertical: 10,
    }
});
