import { useState } from 'react';
import { Globe } from 'lucide-react';

type PublicNotebooksButtonProps = {
  onClick: () => void;
};

function PublicNotebooksButton({ onClick }: PublicNotebooksButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-3 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-1 group"
      aria-label="Open public notebooks"
    >
      <div className="relative flex items-center justify-center gap-1">
        <Globe
          size={20}
          strokeWidth={2.5}
          className={`transition-all duration-300 ${isHovered ? 'rotate-90 scale-110' : ''}`}
        />
        <span className="text-sm font-bold tracking-wide">
          Public Notebooks
        </span>
      </div>
    </button>
  );
}

export default PublicNotebooksButton;
