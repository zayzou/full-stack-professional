import React from 'react'
import {
  Box,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  Text,
  Container,
} from '@chakra-ui/react'

export default function ProductSearch() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch" bg="gray.50" p={6} borderRadius="md">
        <HStack spacing={4} justify="space-between">
          <Box flex={1}>
            <Text mb={2}>Search Product</Text>
            <Input placeholder="Search product..." bg="white" />
          </Box>
          <Box flex={1}>
            <Text mb={2}>Select Category</Text>
            <Select placeholder="all" bg="white">
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </Select>
          </Box>
          <Box flex={1}>
            <Text mb={2}>Select Company</Text>
            <Select placeholder="all" bg="white">
              <option value="company1">Company 1</option>
              <option value="company2">Company 2</option>
              <option value="company3">Company 3</option>
            </Select>
          </Box>
          <Box flex={1}>
            <Text mb={2}>Sort By</Text>
            <Select placeholder="a-z" bg="white">
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </Select>
          </Box>
        </HStack>
        <HStack spacing={4}>
          <Button colorScheme="blue" flex={1}>
            SEARCH
          </Button>
          <Button colorScheme="purple" flex={1}>
            RESET
          </Button>
        </HStack>
      </VStack>
    </Container>
  )
}