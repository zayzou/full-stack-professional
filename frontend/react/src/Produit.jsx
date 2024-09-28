import {
    Wrap,
    WrapItem,
    Spinner,
    Text
} from '@chakra-ui/react';
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { useEffect, useState } from 'react';
import { getProducts } from "./services/client.js";
import CardWithImage from "./components/customer/ProduitCard.jsx";
import CreateProduitDrawer from "./components/customer/CreateProduitDrawer.jsx";
import {errorNotification} from "./services/notification.js";

const Produit = () => {

    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");

    const fetchProduits = () => {
        setLoading(true);
        getProducts().then(res => {
            setProduits(res.data)
        }).catch(err => {
            setError(err.response.data.message)
            errorNotification(
                err.code,
                err.response.data.message
            )
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchProduits();
    }, [])

    if (loading) {
        return (
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        )
    }

    if (err) {
        return (
            <SidebarWithHeader>
                <CreateProduitDrawer
                    fetchProduits={fetchProduits}
                />
                <Text mt={5}>Ooops there was an error</Text>
            </SidebarWithHeader>
        )
    }

    if(produits.length <= 0) {
        return (
            <SidebarWithHeader>
                <CreateProduitDrawer
                    fetchProduits={fetchProduits}
                />
                <Text mt={5}>No produits available</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <CreateProduitDrawer
                fetchProduits={fetchProduits}
            />
            <Wrap justify={"center"} spacing={"30px"}>
                {produits.map((customer, index) => (
                    <WrapItem key={index}>
                        <CardWithImage
                            {...customer}
                            imageNumber={index}
                            fetchProduits={fetchProduits}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
    )
}

export default Produit;