
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ChatInput } from './ChatInput';
import { FastPromptSection } from './FastPromptSection';
import { TaskBanner } from './TaskBanner';
import { SpeechToText } from './ChatInput/SpeechToText';
import { Divider, Stack } from '@chakra-ui/react'

import './index.css';
import { TicketSystem } from './TicketSystem';

export const HomeView = ({ tasks }) => {
    return (
        <div class="home-view-container">
            <Stack spacing={4}>
                <TaskBanner tasks={tasks} />
                <TicketSystem />
                <div class="chat-container">
                    <FastPromptSection tasks={tasks} />
                    <Divider id="chat-divider"/>
                    <ChatInput tasks={tasks} />
                </div>
            </Stack>
        </div>
    );
}