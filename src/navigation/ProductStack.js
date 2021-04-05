import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Product/Home";
import Product from "../screens/Product/Product";
import Search from "../screens/Product/Search";
import colors from "../styles/colors";

export default function ProductStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: {backgroundColor: colors.bgDark},
                cardStyle: {
                    backgroundColor: colors.bgLight
                }
            }}>
            <Stack.Screen 
                name="home"
                component={Home}
                options={{headerShown: false}}/>
            
            <Stack.Screen
                name="product"
                component={Product}
                options={{headerShown: false}}/>
            
            <Stack.Screen 
                name="search"
                component={Search}
                option={{headerShown: false}}/>
        </Stack.Navigator>
    )
}
