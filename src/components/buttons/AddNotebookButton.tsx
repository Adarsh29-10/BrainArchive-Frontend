import { useState } from 'react';
import { Plus } from 'lucide-react';

type AddNotebookButtonProps = {
    onClick : () => void
}

function AddNotebookButton({onClick}:AddNotebookButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative px-4 py-4 rounded-full 
                transition-all duration-300 ease-in-out
                ${isHovered 
                    ? 'border-pink-500 bg-pink-500 shadow-xl scale-105' 
                    : 'border-gray-300 bg-pink-400 shadow-md hover:shadow-lg'
                }
            `}
            aria-label="Add a new notebook"
        >
            <div className="flex flex-col items-center gap-3">
                <Plus 
                    size={36} 
                    strokeWidth={2.5}
                    className={`transition-all duration-300 ${isHovered ? 'scale-105' : 'text-black'}`}
                />
                {/* <span className={`font-bold text-lg transition-colors duration-300 ${isHovered ? 'text-blue-700' : 'text-gray-700'}`}>
                    Add Notebook
                </span> */}
            </div>
        </button>
    );
}

export default AddNotebookButton