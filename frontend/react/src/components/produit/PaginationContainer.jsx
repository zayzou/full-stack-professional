import {useLoaderData, useLocation, useNavigate} from "react-router-dom";
import {Button, HStack,Text} from "@chakra-ui/react";

const PaginationContainer = () => {
    const {meta} = useLoaderData();
    let {totalPages, number,totalElements,size} = meta.paginationDto;
    const pages = Array.from({length: totalPages-1}, (_, index) => {
        return index + 1;
    });
    const {search, pathname} = useLocation();
    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set("page", pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`);
    };

    if (totalPages < 2) return null;
    const startItem = (number - 1) * size + 1
    const endItem = Math.min(number * size, totalElements)
    return (
        <HStack spacing={2}>
            <Text color="gray.500" fontSize="sm">
                Affiche de {startItem}-{endItem} de {totalElements}
            </Text>
            <Button
                onClick={() => {
                    let prevPage = number - 1;
                    if (prevPage < 1) prevPage = totalPages;
                    handlePageChange(prevPage);
                }}
                isDisabled={number === 1}
                bg="gray.100"
                _hover={{bg: 'gray.200'}}
            >
                PREV
            </Button>
            {pages.map((pageNumber) => {
                return (
                    <Button
                        key={pageNumber + 1}
                        onClick={() => handlePageChange(pageNumber)}
                        bg={number === pageNumber ? 'gray.300' : 'gray.100'}
                        _hover={{bg: 'gray.200'}}
                    >
                        {pageNumber}
                    </Button>
                );
            })}
            <Button
                onClick={() => {
                    let nextPage = number + 1;
                    if (nextPage > totalPages) nextPage = 1;
                    handlePageChange(nextPage);
                }}
                isDisabled={number === totalPages-1}
                bg="gray.100"
                _hover={{bg: 'gray.200'}}
            >
                NEXT
            </Button>
        </HStack>
    );
};
export default PaginationContainer;