import {Box, Heading, Text, Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button} from '@chakra-ui/react'

export const Congrats = ({onCloseExit}) => {
    return (
        <Box >
            <Heading as='h2' size='4xl' mb="25px" mt="15px">
                Thank you! ❤️ 💖
                💕
            </Heading>
            <Box>
                <Text mb="25px" fontSize='2xl'>Keep up the great work Anna! Here is the nutritional information of your meal: 🍏
</Text>
                <TableContainer>
                    <Table variant='striped' colorScheme='green'>
                        <Thead>
                            <Tr>
                                <Th fontSize='2xl'>Nutrition</Th>
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
                <Button w="100%" height="100px" size="lg" mt="50px" variant='solid' colorScheme='green' fontSize="4xl" onClick={onCloseExit}>Close</Button>

            </Box>
        </Box>
    );
}