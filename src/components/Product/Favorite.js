import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from "react-native-paper";

export default function Favorite(props) {
    const { product } = props;

    const addFavorite = () => {
        console.log("Producto añadido a la lista de favoritos");
        console.log(product.title);
    }

    return (
        <View style={{ zIndex: 1 }}>
            <Button
                mode="contained"
                contentStyle={styles.btnAddFavoritesContent}
                labelStyle={styles.btnLabel}
                style={styles.btn}
                onPress={addFavorite}>
                Añadir a Favoritos
        </Button>
        </View>

    );
}

const styles = StyleSheet.create({
    btnAddFavoritesContent: {
        paddingVertical: 5,
        backgroundColor: "#057b00"
    },
    btnLabel: {
        fontSize: 18
    },
    btn: {
        marginTop: 20
    }
})
