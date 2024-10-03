import React from 'react'
import {Link, useLoaderData} from 'react-router-dom';
import {Box, Button, Container, HStack, Input, Text, VStack,} from '@chakra-ui/react';


export default function ProductSearch() {
    const {params} = useLoaderData();
    const {search} = params
    return (
        <Container maxW="container.xl" py={8}>
            <form>
                <VStack spacing={6} align="stretch" bg="gray.50" p={6} borderRadius="md">
                    <HStack spacing={4} justify="space-between">
                        <Box flex={1}>
                            <Text mb={2}>Search Product</Text>
                            <Input
                                type='search'
                                label='Rechercher un produit'
                                name='search'
                                placeholder="Search product..."
                                bg="white"
                                defaultValue={search}
                            />
                            <Button type="submit" colorScheme="blue" flex={1}>
                                SEARCH
                            </Button>
                        </Box>
                    </HStack>
                </VStack>
            </form>
        </Container>
    )
}