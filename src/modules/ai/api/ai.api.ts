import axios from "axios"

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
    onChunk : (chunk: string) => void;
}) => {
    const response = await fetch('http://127.0.0.1:3000/chat/stream', {
        method:'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    
    const sessionId = response.headers.get('x-session-id')

    const reader = response.body?.getReader()
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