import { useState, useRef, useEffect } from 'react'
import { MessageBubble } from '../components/bubbles/MessageBubble'
import { ChatInputBar } from '../components/bottomInputBar/ChatInputBar'
import type { IMessage } from '../types'
import { useParams } from 'react-router-dom'
import { useGetAiSessionsById } from '../hooks/useAi'
import { LoadingState, ErrorState } from '../../../shared/ui/LoaderStates'

export const ChatPage = () => {
    const { sessionId: urlSessionId } = useParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const {data: sessionMessages, isLoading, isError, error} = useGetAiSessionsById(urlSessionId ?? null)

    const allMessages = [
        ...(sessionMessages ?? []),
        ...messages.filter(m => !sessionMessages?.find(s => s._id === m._id))
    ]

    useEffect(() => {
        setMessages([])
        setSessionId(null)
    }, [urlSessionId])

    useEffect(() => {
        if (urlSessionId) {
            setSessionId(urlSessionId) 
        }
    }, [urlSessionId])
        
    if (isLoading) return <LoadingState fullScreen/>
    if (isError) return <ErrorState message={error?.message || 'Failed to load history'} />
    
    return (
        <div className="h-full flex flex-col bg-zinc-950 overflow-hidden">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-3xl px-4 pt-6 pb-36 sm:px-6">
                    {allMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center pt-24 text-center">
                            
                            <h2 className="text-lg sm:text-4xl font-semibold text-zinc-200">Want more skills?</h2>
                            <p className="mt-1.5 text-sm text-zinc-500">Start learning from BrainArchive AI</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {allMessages.map((message) => (
                                <MessageBubble 
                                    key={message._id} 
                                    message={message} />
                            ))}
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Input bar */}
            <ChatInputBar
                setMessages={setMessages}
                sessionId={sessionId}
                setSessionId={setSessionId}
            />
        </div>
    )
}
