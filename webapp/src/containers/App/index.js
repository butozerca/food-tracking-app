import './index.css';
import { HomeView } from '../HomeView';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
    return (
        <ChakraProvider>
            <HomeView />
        </ChakraProvider>
    );
}

export default App;
