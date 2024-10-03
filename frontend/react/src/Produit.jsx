import {Text, Wrap, WrapItem} from '@chakra-ui/react';
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {customAxiosInstance, sortOptions} from "./services/client.js";
import CardWithImage from "./components/produit/ProduitCard.jsx";
import CreateProduitDrawer from "./components/produit/CreateProduitDrawer.jsx";
import PaginationContainer from "./components/produit/PaginationContainer.jsx";
import {useLoaderData} from "react-router-dom";
import ProductSearch from "./components/produit/ProductSearch.jsx";

export const loader = async ({request}) => {
    const params = Object.fromEntries(
        [...new URL(request.url).searchParams.entries()]
    );
    params.sort = sortOptions.get(params.sort);
    const response = await customAxiosInstance.get("/products", {params});
    return {products: response.data.productDto, meta: response.data.meta, params};
};
const Produit = () => {
    const {products} = useLoaderData();
    if (products.length <= 0) {
        return (
            <SidebarWithHeader>
                <CreateProduitDrawer
                    produits={products}
                />
                <Text mt={5}>No produits available</Text>
            </SidebarWithHeader>
        )
    }
    return (
        <SidebarWithHeader>
            <CreateProduitDrawer/>
            <Wrap justify={"center"} spacing={"30px"}>
                <ProductSearch/>
                {products.map((produit, index) => (
                    <WrapItem key={index}>
                        <CardWithImage
                            {...produit}
                            imageNumber={index}
                        />
                    </WrapItem>
                ))}
            </Wrap>
            <Wrap>
                <PaginationContainer/>
            </Wrap>
        </SidebarWithHeader>
    )
}

export default Produit;