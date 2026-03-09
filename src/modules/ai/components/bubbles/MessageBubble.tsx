import type { IMessage } from "../../types";

export const MessageBubble = ({ message }: { message: IMessage }) => {
    const isUser = message.role === "user";
    
    return (
        <div className={`flex w-full items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}>

            {/* Bubble */}
            <div
                className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed sm:max-w-2xl ${
                    isUser
                        ? 'bg-zinc-900/20 text-zinc-100 ring-2 ring-zinc-800'
                        : 'bg-zinc-950 text-zinc-300'
                }`}
            >
                <p className="whitespace-pre-wrap text-lg">{message.content}</p>
            </div>
        </div>
    );
};
