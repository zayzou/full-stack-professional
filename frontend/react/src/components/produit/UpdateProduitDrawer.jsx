import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import UpdateProduitForm from "./UpdateProduitForm.jsx";
import {useState} from "react";
import {getProduct} from "../../services/client.js";
import {errorNotification} from "../../services/notification.js";

const CloseIcon = () => "x";

const UpdateProduitDrawer = ({fetchProduits, produitId}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [produit, setProduit] = useState([]);
    //fetch single product info
    const fetchProduit = () => {
        //todo maybe add loading here
        getProduct(produitId).then(res => {
            setProduit(res.data)
            onOpen();
        }).catch(err => {
            errorNotification(
                err.code,
                err.response.data.message
            )
        }).finally(() => {
            //todo replace with end loading
        })
    }

    const handleOnClick = () => {
        fetchProduit()
    }
    return <>
        <Button
            bg={'gray.200'}
            color={'black'}
            rounded={'full'}
            _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
            }}
            onClick={handleOnClick}
        >
            Modifier
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>Modifier produit</DrawerHeader>

                <DrawerBody>
                    <UpdateProduitForm
                        produit={produit}
                        fetchProduit={fetchProduit}
                        produitId={produitId}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        leftIcon={<CloseIcon/>}
                        colorScheme={"teal"}
                        onClick={onClose}>
                        Fermer
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>

}

export default UpdateProduitDrawer;