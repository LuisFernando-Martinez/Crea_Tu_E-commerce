import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from "react-native-paper";
import { size } from "lodash";
import useAuth from "../../hooks/useAuth";
import { isFavoriteApi, addFavoriteApi, deleteFavoriteApi } from "../../api/favorite";

export default function Favorite(props) {
    const { product } = props;
    const [isFavorite, setIsFavorite] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth, product._id);
            if(size(response) === 0) setIsFavorite(false);
            else setIsFavorite(true);
        })();
    }, [product]);

    const addFavorite = async () => {
        if(!loading){
            setLoading(true);
            try {
                await addFavoriteApi(auth, product._id);
                setIsFavorite(true);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    };

    const deleteFavorite = async () => {
        if(!loading){
            setLoading(true);
            try {
                await deleteFavoriteApi(auth, product._id);
                setIsFavorite(false);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    }

    if(isFavorite === undefined)return null;

    return (
        <View style={{ zIndex: 1 }}>
            <Button
                mode="contained"
                contentStyle={isFavorite ? styles.btnDeleteFavoritesContent : styles.btnAddFavoritesContent}
                labelStyle={styles.btnLabel}
                style={styles.btn}
                onPress={isFavorite ? deleteFavorite : addFavorite}
                loading={loading}>
                {isFavorite ? "Eliminar de Favoritos": "Añadir a Favoritos"}
        </Button>
        </View>

    );
}

const styles = StyleSheet.create({
    btnAddFavoritesContent: {
        paddingVertical: 5,
        backgroundColor: "#057b00"
    },
    btnDeleteFavoritesContent: {
        paddingVertical: 5,
        backgroundColor: "#c40000"
    },
    btnLabel: {
        fontSize: 18
    },
    btn: {
        marginTop: 20
    }
})
