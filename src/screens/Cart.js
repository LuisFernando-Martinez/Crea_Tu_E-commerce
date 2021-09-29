import React, { useState, useCallback, useEffect} from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StatusBar from "../components/StatusBar";
import NotProducts from '../components/Cart/NotProducts';
import ProductList from '../components/Cart/ProductList';
import AddressList from '../components/Cart/AddressList';
import Payment from '../components/Cart/Payment';
import useAuth from "../hooks/useAuth";
import { getProductCartApi } from "../api/cart";
import  { getAddressesApi } from "../api/address";
import colors from "../styles/colors";

export default function Cart() {
    const [cart, setCart] = useState(null);
    //Estado para guardar la infor de los productod
    const [products, setProducts] = useState(null);
    //interrumptor para cargar el carrito
    const [reloadCart, setReloadCart] = useState(false);
    //Estado para guardar las direciones del usuario
    const [addresses, setAddresses] = useState(null);
    //Estado para guardar la direccion seleccionada
    const [selectedAddress, setSelectedAddress] = useState(null);
    //Estado para el total a pagar
    const [totalPayment, setTotalPayment] = useState(null);
    //uso de la Autenticacion para obtener la direccion
    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            setCart(null);
            setAddresses(null);
            //limpiamos la direcciones guardadas en el carrito
            setSelectedAddress(null);

            loadCart();
            loadAddresses();
        },[])
    );

    //LoadCart
    useEffect(() => {
        if(reloadCart){
            loadCart();
            setReloadCart(false);
        }
    }, [reloadCart]);

    //
    const loadCart = async () =>{
        const response = await getProductCartApi();
        setCart(response);
    }

    //funcion para cargar la direccion cada que se cargue la pantalla de carrito
    const loadAddresses = async () => {
        const response = await getAddressesApi(auth);
        //Guardamos las direcciones en un estado
        setAddresses(response);
    }

    return (
        <>
        <StatusBar backgroundColor={colors.bgDark} barStyle="light-content"/>
        
        {!cart && size(cart) === 0 ? (
            //Si carrito es nulo o cart es igual a 0
            <NotProducts/>
        ) : (
            //Si hay productos
            <KeyboardAwareScrollView extraScrollHeight={25}>
                <ScrollView style={styles.cartContainer}>
                    <ProductList
                        cart={cart}
                        products={products}
                        setProducts={setProducts}
                        setReloadCart={setReloadCart}
                        setTotalPayment={setTotalPayment}/>
                    <AddressList 
                        addresses={addresses}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}/>
                    <Payment
                    totalPayment={totalPayment}
                    products={products}
                    selectedAddress={selectedAddress}/>
                </ScrollView>
            </KeyboardAwareScrollView>
        )}
        </>
    );
}


const styles = StyleSheet.create({
    cartContainer: {
        padding: 10
    }
});