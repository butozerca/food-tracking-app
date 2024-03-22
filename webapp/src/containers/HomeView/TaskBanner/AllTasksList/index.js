import './index.css';
import { Box } from '@chakra-ui/react'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'

export const AllTasksList = ({tasks}) => {
    let first = "No tasks";
    let rest_tasks = [];
    if (first.length !== 0) {
        first = tasks[0];
        rest_tasks = tasks.slice(1);
    }
    
    const list = []
    rest_tasks.forEach((task) => {
        list.push(
            <AccordionItem>
                <h2>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        {task.title}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <span class="task-description">{task.description}</span>
                </AccordionPanel>
            </AccordionItem>)
    })


    return (
        <Accordion>
            <AccordionItem>
                <h2>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        <b id="current-task"> 
                            {tasks.length === 0 ? (
                                <span> No tasks </span>
                            ) : (
                                <span> {first.title} </span>
                            )
                            } 
                        </b>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                {tasks.length === 0 ? (
                    <span>  </span>
                ) : (
                    <span class="task-description"> {first.description} </span>
                )
                }
                </AccordionPanel>
            </AccordionItem>
            {list}
        </Accordion>
    );
}