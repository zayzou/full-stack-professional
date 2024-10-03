import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    FormLabel,
    IconButton,
    Image,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    SimpleGrid,
    Stack,
    VStack
} from "@chakra-ui/react";
import {formFields, setProductProfilePicture, updateProduit, uploadOneProductPicture} from "../../services/client.js";
import {errorNotification, successNotification} from "../../services/notification.js";
import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {IoMdMore} from "react-icons/all.js";

const MyTextInput = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} disabled/>
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const MyDropzone = ({produitId, fetchProduit}) => {
    const onDrop = useCallback(acceptedFiles => {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0])
        uploadOneProductPicture(
            produitId,
            formData
        ).then(() => {
            successNotification("Success", "Profile picture uploaded")
            fetchProduit()
        }).catch(() => {
            errorNotification("Error", "Profile picture failed upload")
        })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Box {...getRootProps()}
             w={'100%'}
             textAlign={'center'}
             border={'dashed'}
             borderColor={'gray.200'}
             borderRadius={'3xl'}
             p={6}
             rounded={'md'}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Déposez l'image ici ...</p> :
                    <p>Glissez-déposez l'image ici, ou cliquez pour sélectionner une image</p>
            }
        </Box>
    )
}


// And now we can use these
const UpdateProduitForm = ({produit, fetchProduit, produitId}) => {

    const handleDeleteProductPicture = async (imageKey) => {
        try {
            /*todo uncomment this when implemented await deleteProductPicture(imageKey)*/
            successNotification('Pas encore implemente 🙁')
        } catch (error) {
            errorNotification({
                title: 'Error deleting product',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleSetProfileImage = async (imageKey) => {
        await setProductProfilePicture(produit.id, imageKey)
        fetchProduit()
    }
    return (
        <>
            <VStack spacing={'5'} mb={'5'}>
                <Image
                    borderRadius={'full'}
                    boxSize={'150px'}
                    objectFit={'cover'}
                    src={produit.images[0].url}
                />
                <MyDropzone
                    produitId={produitId}
                    fetchProduit={fetchProduit}
                />
                <VStack>
                    <SimpleGrid columns={3} spacing={10}>
                        {produit.images.map((image) => (

                            <Box key={image.key} position="relative">
                                <Image src={image.url} alt={`Product ${image.key}`} height="15rem"/>
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label="Options"
                                        icon={<IoMdMore className="h-4 w-4"/>}
                                        // variant="ghost"
                                        size="sm"
                                        position="absolute"
                                        top="2"
                                        right="2"
                                    />
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => handleDeleteProductPicture(image.key)}>Supprimer</MenuItem>
                                        <MenuItem onClick={() => handleSetProfileImage(image.key)}>
                                            Photo de profil
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </VStack>
            <Formik
                initialValues={{
                    codeArticle: produit.codeArticle,
                    name: produit.name ?? "",
                    description: produit.description ?? "",
                    packaging: produit.packaging ?? "",
                    innerPackaging: produit.innerPackaging ?? "",
                    category: produit.category.name,
                    brand: produit.brand.name
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Must be 20 characters or less')
                        .required('Required'),
                    age: Yup.number()
                        .min(16, 'Must be at least 16 years of age')
                        .max(100, 'Must be less than 100 years of age')
                        .required(),
                })}
                onSubmit={(updatedProduit, {setSubmitting}) => {
                    setSubmitting(true);
                    updateProduit(produitId, updatedProduit)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "Produit updated",
                                `${updatedProduit.name} was successfully updated`
                            )
                            fetchProduit();
                        }).catch(err => {
                        console.log(err);
                        errorNotification(
                            err.code,
                            err.response.data.message
                        )
                    }).finally(() => {
                        setSubmitting(false);
                    })
                }}
            >
                {({isValid, isSubmitting, dirty}) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            {formFields.map((field, index) => (
                                <MyTextInput
                                    key={index}
                                    label={field.label}
                                    name={field.name}
                                    type="text"
                                    placeholder={field.placeholder}
                                />
                            ))}
                            />

                            {/* Submit Button */}
                            <Button disabled={!(isValid && dirty) || isSubmitting} type="submit">
                                Modifier
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default UpdateProduitForm;