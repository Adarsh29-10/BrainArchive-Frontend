import { Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface AiSummaryButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

function AiSummaryButton({ onClick, isLoading = false, disabled = false }: AiSummaryButtonProps) {
  const [showSparkles, setShowSparkles] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setShowSparkles(true);
    onClick?.();
    setTimeout(() => setShowSparkles(false), 600);
  };

  return (
    <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled || isLoading}
        className="relative px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 group"
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
                className={`transition-all duration-300 ${isHovered ? 'rotate-90 scale-110' : ''}`}
            />
            <span>AI Summary</span>
            </>
        )}

        {/* Animated sparkle effect on hover */}
        {showSparkles && (
            <>
            <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute bottom-2 left-1 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
            </>
        )}
    </button>
  );
}

export default AiSummaryButton;
