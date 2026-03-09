import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface AiChatCardProps {
    title: string;
    sessionId: string;
    onClick?: () => void;
    onDelete?: () => void;
    onRename?: () => void;
}

    

function AiChatCard({
    title,
    sessionId,
    onClick,
    onDelete,
    onRename,
}: AiChatCardProps
) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (!menuRef.current) return;
        if (!menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navigate = useNavigate()

    return (
        <article
            className="group relative w-full rounded-xl border border-zinc-800  bg-zinc-900 text-white cursor-pointer"
            onClick={() => navigate(`/ai/chat/${sessionId}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
                }
            }}
        >
        <div className="p-4 sm:p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <h3 className="truncate text-sm font-medium text-zinc-100 group-hover:text-white">
                    {title}
                    </h3>
                </div>

                {/* Menu */}
                <div ref={menuRef} className="relative flex shrink-0 items-start">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen((prev) => !prev);
                        }}
                        className="rounded-md p-1 text-zinc-500 transition-all hover:bg-zinc-800 hover:text-zinc-300"
                        aria-label="Chat options"
                    >
                        <MoreVertical className="h-4 w-4" />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-8 top-0 z-20 w-40 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 py-1 shadow-xl shadow-black/40 animate-in fade-in slide-in-from-top-1">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(false);
                                    onRename?.();
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
                            >
                            <Edit className="h-3.5 w-3.5" />
                                Rename
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(false);
                                    onDelete?.();
                                }}
                                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-400 transition-colors hover:bg-zinc-700 hover:text-red-300"
                            >
                            <Trash2 className="h-3.5 w-3.5" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Bottom accent line on hover */}
        <div className="h-[2px] w-full rounded-b-xl bg-gradient-to-r from-transparent via-amber-500/0 to-transparent transition-all duration-300 group-hover:via-green-500/60" />
        </article>
    );
}

export default AiChatCard;