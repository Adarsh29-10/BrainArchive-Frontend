import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDeleteAiSession, useRenameAiSession } from '../../hooks/useAi';
import RenameSessionModal from '../modals/RenameSessionModal';
import DeleteModal from '../../../notebook/components/modals/DeleteModal';


interface AiChatCardProps {
    title: string;
    sessionId: string;
    onClick?: () => void;
    onRename?: () => void;
}

function AiChatCard({
    title,
    sessionId,
}: AiChatCardProps
) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const deleteMutation = useDeleteAiSession()
    const renameMutation = useRenameAiSession()

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
            className="group relative w-full rounded-xl border border-zinc-800  bg-zinc-900 text-white cursor-pointer hover:bg-zinc-800"
            onClick={() => navigate(`/ai/chat/${sessionId}`)}
            role="button"
            tabIndex={0}
        >
        <div className="p-4 sm:p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <h3 className="truncate text-sm sm:text-lg font-medium text-zinc-100 group-hover:text-white">
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
                        className="rounded-md p-1 text-zinc-500 transition-all hover:bg-zinc-700 hover:text-zinc-300"
                        aria-label="Chat options"
                    >
                        <MoreVertical className="h-4 w-4 sm:h-6 sm:w-6" />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-8 top-0 z-20 w-40 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 py-1 shadow-xl shadow-black/40 animate-in fade-in slide-in-from-top-1">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(false);
                                    setIsRenameModalOpen(true);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
                            >
                            <Edit className="h-3.5 w-3.5" />
                                Rename
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(false)
                                    setIsDeleteModalOpen(true)
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
        
        {/* Delete Modal */}
        {isDeleteModalOpen && 
            <div onClick={(e) => e.stopPropagation()}>
                <DeleteModal
                    isOpen = {isDeleteModalOpen}
                    title='Delete Conversation'
                    onCancel={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => 
                        deleteMutation.mutate(sessionId, {
                            onSuccess: () => setIsMenuOpen(false),
                    })}
                    isLoading={deleteMutation.isPending}
                /> 
            </div>
        }

        {/* Rename Modal */}
        {isRenameModalOpen && (
            <div onClick={(e) => e.stopPropagation()}>
                <RenameSessionModal
                    isOpen={isRenameModalOpen}
                    currentTitle={title}
                    onClose={() => setIsRenameModalOpen(false)}
                    onConfirm={(newTitle) => {
                        renameMutation.mutate(
                            {
                                sessionId,
                                title: newTitle,
                            },
                            {
                                onSuccess: () => {
                                    setIsRenameModalOpen(false);
                                },
                            }
                        );
                    }}
                    isLoading={renameMutation.isPending}
                />
            </div>
        )}
        </article>
    );
}

export default AiChatCard;