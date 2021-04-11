import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/Search";
import ScreenLoading from "../../components/ScreenLoading";
import ResultNotFoud from "../../components/Search/ResultNotFound";
import ProductList from "../../components/Search/ProductList";
import { searchProductsApi } from "../../api/search";
import colors from "../../styles/colors";

export default function SearchScreen(props) {
    const { route } = props;
    const { params } = route;
    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {
            setProducts(null);
            const response = await searchProductsApi(params.search);
            console.log(response);
            setProducts(response);
        })();
    }, [params.search]);

    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            <Search currentSearch={params.search} />
            {!products ? (
                <ScreenLoading text="Buscando Productos" />
            ) : size(products) === 0 ? (
                <ResultNotFoud search={params.search} />
            ) : (
                <ProductList products={products}/>
            )}
        </>
    );
}
