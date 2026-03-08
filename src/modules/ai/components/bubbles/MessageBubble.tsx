import { Sparkles, User } from "lucide-react";
import type { IMessage } from "../../types";

export const MessageBubble = ({ message }: { message: IMessage }) => {
    const isUser = message.role === "user";

    return (
        <div className={`flex items-start gap-3`}>
            {/* Avatar */}
            <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ${
                    isUser
                        ? 'bg-zinc-800 ring-zinc-700'
                        : 'bg-zinc-900 ring-zinc-800'
                }`}
            >
                {isUser ? (
                    <User size={14} className="text-zinc-300" />
                ) : (
                    <Sparkles size={14} className="text-zinc-400" />
                )}
            </div>

            {/* Bubble */}
            <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed sm:max-w-2xl ${
                    isUser
                        ? 'bg-zinc-800 text-zinc-100 ring-1 ring-zinc-700'
                        : 'bg-zinc-900 text-zinc-300 ring-1 ring-zinc-800'
                }`}
            >
                <p className="whitespace-pre-wrap text-lg">{message.text}</p>
            </div>
        </div>
    );
};