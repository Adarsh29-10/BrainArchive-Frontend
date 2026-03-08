import { Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NewChatAiButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
}

function NewChatAiButton({ isLoading = false, disabled = false }: NewChatAiButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate(); 

    return (
        <button
            onClick={() => navigate('/ai/chat')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={disabled || isLoading}
            className="relative px-3 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-1 group"
            title="Generate AI summary"
        >
            {isLoading ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Generating...</span>
                </>
            ) : (
                <>
                    <Sparkles 
                        size={20} 
                        strokeWidth={2.5}
                        className={`transition-all duration-300 ${isHovered ? 'rotate-90 scale-110' : ''}`}
                    />
                    <span className="text-sm font-bold tracking-wide">
                        New Chat
                    </span>
                </>
            )}           
        </button>
    );
}

export default NewChatAiButton;
