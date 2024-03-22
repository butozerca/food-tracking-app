import './index.css';
import { HomeView } from '../HomeView';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'


const App = () => {
    return (
        <ChakraProvider>
            <HomeView />
        </ChakraProvider>
    );
}

export default App;
