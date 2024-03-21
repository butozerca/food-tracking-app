
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Divider, Stack } from '@chakra-ui/react'

import './index.css';
import { TicketSystem } from './TicketSystem';

export const HomeView = ({ tasks }) => {
    return (
        <div class="home-view-container">
            <Stack spacing={4}>
                <TicketSystem />
            </Stack>
        </div>
    );
}