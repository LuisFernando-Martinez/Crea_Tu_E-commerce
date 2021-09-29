import AsyncStorage from "@react-native-async-storage/async-storage";
import { size, map, filter } from "lodash";
import { API_URL, CART } from "../utils/constants";

export async function getProductCartApi(){
    //Linea para remover los productos del carrito sin que funcione aun
    //await AsyncStorage.removeItem(CART);
    try {
        const cart = await AsyncStorage.getItem(CART);
        if(!cart) return [];
        return JSON.parse(cart);
    } catch (error) {
        return null;
    }
}

export async function addProductCartApi(idProduct, quantity){
    try {
        const cart = await getProductCartApi();
        //Si cart es null
        if(!cart) throw "Error al obtener el carrito"

        if(size(cart) === 0){
            cart.push({
                idProduct,
                quantity
            })
        }else{
            let found = false;

            map(cart, (product) =>{
                if(product.idProduct === idProduct){
                    product.quantity += quantity;
                    found = true;
                    return product;
                }
            });
            //Si el producto no existe en el carrito
            if(!found){
                cart.push({
                    idProduct,
                    quantity
                });
            }
        }
        await AsyncStorage.setItem(CART, JSON.stringify(cart));
        return true;
    } catch (error) {
        return false;
    }
}

export async function deleteProductCartApi(idProduct){
    try {
        const cart = await getProductCartApi();
        const newCart = filter(cart, (product) =>{
            return product.idProduct !== idProduct;
        });
        await AsyncStorage.setItem(CART, JSON.stringify(newCart));
        return true;
    } catch (error) {
        return null;
    }
}

export async function increaseProductCartApi(idProduct){
    try {
        const cart = await getProductCartApi();
        map(cart, (product) =>{
            if(product.idProduct === idProduct){
                return (product.quantity += 1);
            }
        });

        await AsyncStorage.setItem(CART, JSON.stringify(cart));
        return true;
    } catch (error) {
        return null;
    }
}

export async function decreaseProductCartApi(idProduct){
    let isDelete = false;

    try {
        //obtenemos el carrito
        const cart = await getProductCartApi();

        //buscamos el producto en el carrito
        map(cart, (product) => {
            //si en cuentra el producto en el carrito
            if(product.idProduct === idProduct){
                // si la cantidad de producto es igual a 1 se eliminara del carrito
                if(product.quantity === 1){
                    isDelete = true;
                    return null;
                }else{
                    //SI no solo se le restara uno
                    return (product.quantity -= 1);
                }
            }
        });

        if(isDelete){
            await deleteProductCartApi(idProduct);
        }else{
            await AsyncStorage.setItem(CART, JSON.stringify(cart));
        }
        return true;
        
    } catch (error) {
        return null;
    }
}