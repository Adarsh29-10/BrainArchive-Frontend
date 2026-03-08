import { useState, useRef, useEffect } from 'react'
import { MessageBubble } from '../components/bubbles/MessageBubble'
import { ChatInputBar } from '../components/bottomInputBar/ChatInputBar'
import type { IMessage } from '../types'

export const ChatPage = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="h-full flex flex-col bg-zinc-950 overflow-hidden">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-3xl px-4 pt-6 pb-36 sm:px-6">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center pt-24 text-center">
                            
                            <h2 className="text-lg sm:text-4xl font-semibold text-zinc-200">You ready?</h2>
                            <p className="mt-1.5 text-sm text-zinc-500">Start learning from BrainArchive AI</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {messages.map((message) => (
                                <MessageBubble key={message.id} message={message} />
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