import './index.css';
import { HomeView } from '../HomeView';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'


const App = () => {
    const [tasks, setTasks] = useState([])

    const fetchTaskData = () => {
        fetch("http://localhost:5000/tasks")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setTasks(data); 
          })
    }

    useEffect(() => {
        fetchTaskData()
    }, [])

    console.log(tasks);

    return (
        <ChakraProvider>
            <HomeView tasks={tasks}/>
        </ChakraProvider>
    );
}

export default App;
