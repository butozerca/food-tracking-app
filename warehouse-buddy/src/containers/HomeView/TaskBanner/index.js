import './index.css';
import { Button, useDisclosure, Flex, Spacer } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'

import{Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import { AllTasksList } from './AllTasksList';

export const TaskBanner = ({tasks}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div class="task-banner-container">
            <Card style={{ boxShadow: ' 0px 1px 8px rgba(0, 128, 128, 0.4)' }}>
                <CardBody>
                    <Heading size='xs' id='header-title'>Obecne zadanie</Heading>
                    <Flex>
                        <b id="current-task">
                            {tasks.length === 0 ? (
                                <span> No tasks </span>
                            ) : (
                                <span> {tasks[0].title} </span>
                            )
                            }
                        </b>
                        <Spacer />
                        <IconButton
                            onClick={onOpen}
                            color='white'
                            background='teal.500'
                            aria-label='Search database'
                            icon={<ArrowForwardIcon />}
                            size="sm"
                        />
                    </Flex>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Wszystkie zadania</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AllTasksList tasks={tasks} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}