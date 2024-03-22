import { API_BASE_URL, API_TOKEN, WAREHOUSE_BASIC_INFO, RESPONSE_INSTRUCTIONS} from './const';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY



const CreateTasksInput = (tasks) => {
    const tasksString = JSON.stringify(tasks);

    const tasksFormatted = 
    `
        AKTYWNE ZADANIA UŻYTKOWNIKA:

        Poniżej masz informacje na temat aktualnych zadań użytkownika.
        Na początku jest obecne zadanie, potem kolejne. Pomóż użytkownikowi w wykonaniu tych zadań.
        Gdy użytkownik zapyta co powinien zrobić, na podstawie tych zadań daj wskazówki.
        ${tasksString}

    `

    return tasksFormatted;
}

export const FetchResponse = async (query) => {


    const searchTerm = query["prompt"];
    const tasks = query["tasks"];

    console.log('In fetch response');
    console.log(tasks);

    const tasksInfo = CreateTasksInput(tasks);

    const SYSTEM_MSG = WAREHOUSE_BASIC_INFO + tasksInfo + RESPONSE_INSTRUCTIONS;


    console.log(SYSTEM_MSG);

    const requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    const requestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "system", "content": SYSTEM_MSG},
                     {"role": "user", "content": searchTerm}]
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
    });

    const jsonresponse = await response.text()
    const text = JSON.parse(jsonresponse)['choices'][0].message.content;
    
    console.log(text)

    return text; // response.text;
}


export const sendTicketApi = async (ticket) => {
    const url = 'http://localhost:5000/ticketing';
    const data = ticket

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'No-Auth': 'True'
        },
        body: JSON.stringify(data),
        compress: true
        });

    const json = await response;

    return "done";
}