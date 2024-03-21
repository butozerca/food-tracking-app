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
            <Heading as='h2' size='4xl' mb="25px">
                Thank you! ❤️ 💖
                💕
            </Heading>
            <Box>
                <Text mb="25px" fontSize='2xl'>Keep up the great work Theresa! Here is the nutritional information: 🍏
</Text>
                <TableContainer>
                    <Table variant='striped' colorScheme='green'>
                        <Thead>
                            <Tr>
                                <Th fontSize='2xl'> Nutrition</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody fontSize='2xl'>
                            <Tr>
                                <Td fontSize='2xl'>Calories</Td>
                                <Td fontSize='2xl'>332</Td>
                            </Tr>
                            <Tr>
                                <Td fontSize='2xl'>Carbs</Td>
                                <Td fontSize='2xl'>55g</Td>
                            </Tr>
                            <Tr>
                                <Td fontSize='2xl'>Protein</Td>
                                <Td fontSize='2xl'>9.4g</Td>
                            </Tr>
                            <Tr>
                                <Td fontSize='2xl'>Fats</Td>
                                <Td fontSize='2xl'>7.8g</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}