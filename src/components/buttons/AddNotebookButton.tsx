import { useState } from 'react';
import { Plus } from 'lucide-react';

type AddNotebookButtonProps = {
    onClick: () => void;
}

function AddNotebookButton({ onClick }: AddNotebookButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 overflow-hidden"
            aria-label="Add a new notebook"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
            
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${isHovered ? 'animate-pulse' : ''}`} />

            {/* Content */}
            <div className="relative flex items-center justify-center gap-2">
                <Plus
                    size={20}
                    strokeWidth={2.5}
                    className={`transition-all duration-300 ${isHovered ? 'rotate-90 scale-110' : ''}`}
                />
                <span className="text-sm font-bold tracking-wide">
                    Add Notebook
                </span>
                
            </div>
        </button>
    );
}

export default AddNotebookButton;