import axios from "axios"
import { fastapiApi } from "../../../shared/api/fastapi.api"

export const ChatAI = async (data: {
    sessionId?: string | null,
    message: string
}) => {
    const response = await axios.post('http://127.0.0.1:3000/chat', data)

    return response.data.reply
}

export const ChatAIStream = async (data: {
    sessionId?: string | null;
    message: string;
    token: string;
    onChunk : (chunk: string) => void;
}) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL_AI}/chat/stream`, {
        method:'post',
        headers: {
            'Content-Type':'application/json',
            "Authorization": `Bearer ${data.token}`
        },
        body: JSON.stringify({
            message: data.message, 
            sessionId: data.sessionId
        })
    })
    
    const sessionId = response.headers.get('x-session-id')

    if (!response.body) {
        return sessionId
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder();


    while(true){
        const {done, value} = await reader.read()
        if(done) break;

        const raw = decoder.decode(value)
        
        const lines = raw.split("\n").filter(el => el !== '')

        for (const line of lines){
            if(line === 'data: [DONE]') continue;

            const chunk = line.replace("data: ", "")

            data.onChunk(chunk)
        }
    }

    return sessionId
}


export const getAiSessions = async () => {
    const response = await fastapiApi.get('/sessions')

    return response.data.data;
}

export const getAiSessionsById = async (sessionId: string) => {
    const response = await fastapiApi.get(`/sessions/${sessionId}`)

    return response.data.data;
}
