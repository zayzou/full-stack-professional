import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    FormLabel,
    Heading,
    Image,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react';
import {Form, Formik, useField} from "formik";
import * as Yup from 'yup';
import {useAuth} from "../context/AuthContext.jsx";
import {errorNotification} from "../../services/notification.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const MyTextInput = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const LoginForm = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    return (
        <Formik
            validateOnMount={true}
            validationSchema={
                Yup.object({
                    email: Yup.string()
                        .email("L'email doit être valide")
                        .required("L'email est requis"),
                    password: Yup.string()
                        .max(20, "Le mot de passe ne peut pas dépasser 20 caractères")
                        .required("Le mot de passe est requis")
                })
            }
            initialValues={{email: '', password: ''}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                login(values).then(res => {
                    navigate("/dashboard/produits")
                    console.log("Successfully logged in");
                }).catch(err => {
                    errorNotification(
                        err.code,
                        err.response.data.message
                    )
                }).finally(() => {
                    setSubmitting(false);
                })
            }}>

            {({isValid, isSubmitting}) => (
                <Form>
                    <Stack mt={15} spacing={15}>
                        <MyTextInput
                            label={"Email"}
                            name={"email"}
                            type={"email"}
                            placeholder={"votre@email.com"}
                        />
                        <MyTextInput
                            label={"Mot de passe"}
                            name={"password"}
                            type={"password"}
                            placeholder={"Tapez votre mot de passe"}
                        />

                        <Button
                            type={"submit"}
                            disabled={!isValid || isSubmitting}>
                            Login
                        </Button>
                    </Stack>
                </Form>
            )}

        </Formik>
    )
}

const Login = () => {

    const {customer} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (customer) {
            navigate("/dashboard/produits");
        }
    })

    return (
        <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
            <Flex p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Image
                        src={"https://images.ctfassets.net/8sdirxbcrn01/5eKfbbR4CoLT88i54gOWwy/0770b0f3579c54949a04dfd0c40cfcb6/stilina-removebg-preview.png"}
                        boxSize={"200px"}
                        alt={"Logo Amigoscode"}
                        alignSelf={"center"}
                    />
                    <Heading fontSize={'2xl'} mb={15}>Se connecter</Heading>
                    <LoginForm/>
                    <Link color={"blue.500"} href={"/signup"}>
                        Vous n'avez pas de compte ? Contactez l'administrateur.
                    </Link>
                </Stack>
            </Flex>
            <Flex
                flex={1}
                p={10}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                bgGradient={{sm: 'linear(to-r, yellow.200, yellow.400)'}}
            >
                <Text fontSize={"6xl"} color={'white'} fontWeight={"bold"} mb={5}>
                    <Link target={"_blank"} href={"https://zahir.com/courses"}>
                    </Link>
                </Text>
                <Image
                    alt={'Image de connexion'}
                    objectFit={'scale-down'}
                    src={
                        'https://dev.stilina.com/assets/msb-XGVe-rnY.png'
                    }
                />
            </Flex>
        </Stack>
    );
}

export default Login;