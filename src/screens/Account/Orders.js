import React from 'react';
import { ScrollView, Text } from 'react-native';
import StatusBar from "../../components/StatusBar";

export default function Orders() {
    return (
        <>
            <StatusBar />
            <ScrollView>
                <Text>Estamos en mis Pedidos</Text>
            </ScrollView>
        </>
    );
}
