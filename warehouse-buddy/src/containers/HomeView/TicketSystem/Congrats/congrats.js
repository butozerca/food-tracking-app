import {Box, Heading, Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useEditable,} from '@chakra-ui/react'
import React, {useEffect} from 'react';

export const Congrats = () => {
    return (
        <Box >
            <Heading size='lg'>
                Thank you! 
            </Heading>
            <Box>
                <Text fontSize='xl'>Keep up the great work Theresa! Here is the nutritional information:</Text>
                <TableContainer>
                    <Table variant='striped' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                <Th>Nutrition</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Calories</Td>
                                <Td>332</Td>
                            </Tr>
                            <Tr>
                                <Td>Carbs</Td>
                                <Td>55g</Td>
                            </Tr>
                            <Tr>
                                <Td>Protein</Td>
                                <Td>9.4g</Td>
                            </Tr>
                            <Tr>
                                <Td>Fats</Td>
                                <Td>7.8g</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}