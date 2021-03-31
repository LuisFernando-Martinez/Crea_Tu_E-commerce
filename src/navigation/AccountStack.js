import React from 'react';
import { createStackNavigator} from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import ChangeName from "../screens/Account/ChangeName";
import ChangeEmail from "../screens/Account/ChangeEmail";
<<<<<<< HEAD
=======
import ChangeUsername from "../screens/Account/ChangeUsername";
import ChangePassword from "../screens/Account/ChangePassword";
import Addresses from "../screens/Account/Adrdresses";
>>>>>>> 03c5c9032fe075b08107e97423da02bf36ecf04b
import colors from '../styles/colors';

const Stack = createStackNavigator();

export default function AccountStack() {
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
                name="account"
                component={Account}
                options={{title: "Cuenta", headerShown:false}}
            />
            
            <Stack.Screen
                name="change-name"
                component={ChangeName}
                options ={{
                    title:"Cambiar nombre y apellidos"
                }}
            />

            <Stack.Screen
                name="change-email"
                component={ChangeEmail}
                option={{
                    title: "Cambiar email"
                }}/>
<<<<<<< HEAD
=======

            <Stack.Screen
                name="change-username"
                component={ChangeUsername}
                options={{
                    title: "Cambiar username"
                }}/>

            <Stack.Screen
                name="change-password"
                component={ChangePassword}
                options={{
                    title: "Cambiar contraseña"
                }}/>

            <Stack.Screen 
                name="addresses"
                component={Addresses}
                options={{
                    title: "Mis direcciones"
                }}/>
>>>>>>> 03c5c9032fe075b08107e97423da02bf36ecf04b
        </Stack.Navigator>
    )
}
