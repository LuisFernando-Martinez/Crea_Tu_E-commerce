import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { searchProductsApi } from "../../api/search";

export default function Search(props) {
    const { route } = props;
    const { params } = route;
    const [products, setProducts] = useState(null);
    
    useEffect(() => {
        (async () => {
            setProducts(null);
            const response = await searchProductsApi(params.search);
            setProducts(response);
        })();
    }, [params.search]);

    return (
        <View>
            <Text>Search...</Text>
        </View>
    );
}
