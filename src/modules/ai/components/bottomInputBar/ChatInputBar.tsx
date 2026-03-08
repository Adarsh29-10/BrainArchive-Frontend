import { SendHorizontal } from "lucide-react"
import { useRef, useState } from 'react'
import type { IMessage } from "../../types";
import { ChatAIStream } from "../../api/ai.api";
import { useNavigate } from "react-router-dom";

interface ChatInputBarProps {
    setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
    sessionId: string | null;
    setSessionId: (sessionId: string) => void;
}

export const ChatInputBar = ({setMessages, sessionId, setSessionId  }: ChatInputBarProps) => {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resetHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const navigate = useNavigate()

    const addMessage = async () => {
        if (!input.trim()) return;

        setMessages(prev => [
            ...prev,
            { id: crypto.randomUUID(), role: "user", text: input }
        ]);

        setInput("");
        resetHeight();

        const aiMessageId = crypto.randomUUID();
         
        setMessages(prev => [
            ...prev,
            { id: aiMessageId , role: "ai", text: '' }
        ]);

        const newSessionId = await ChatAIStream({
            message: input,
            sessionId: sessionId,
            onChunk: (chunk) => {
                setMessages(prev => 
                    prev.map(msg => msg.id === aiMessageId
                        ? { ...msg, text: msg.text + chunk } 
                        : msg
                    )
                )
            },
        })

        if(!sessionId && newSessionId){
            setSessionId(newSessionId)
            navigate(`/ai/chat/${newSessionId}`)
        }


    };

    const hasInput = input.trim().length > 0;

    return (
        <div className="px-4 md:pb-6 pb-4">
            <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 transition-colors focus-within:border-zinc-500">
                <textarea
                    ref={textareaRef}
                    className="flex-1 resize-none bg-transparent py-1.5 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-500 outline-none"
                    rows={1}
                    placeholder="Message AI..."
                    value={input}
                    onChange={e => {
                        setInput(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            addMessage();
                        }
                    }}
                />

                <button
                    onClick={() => addMessage()}
                    disabled={!hasInput}
                    className={`mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        hasInput
                            ? 'bg-zinc-100 text-zinc-900 hover:bg-white'
                            : 'text-zinc-600 cursor-not-allowed'
                    }`}
                >
                    <SendHorizontal size={16} />
                </button>
            </div>
          
        </div>
    );
}