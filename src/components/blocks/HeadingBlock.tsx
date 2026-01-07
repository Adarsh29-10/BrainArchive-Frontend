import { X } from 'lucide-react';

interface HeadingBlockProps {
  block: {
    _id: string;
    content: string;
  };
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
}

function HeadingBlock({ block, onChange, onDelete }: HeadingBlockProps) {
  return (
    <div className="relative mb-1 group">
      <textarea
        className="text-4xl font-bold w-full py-2 px-4 pr-14 border-2 border-transparent rounded-lg border-pink-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all resize-none overflow-hidden bg-transparent hover:bg-pink-50/30 "
        placeholder="Heading..."
        value={block.content}
        onChange={(e) => {
          onChange(block._id, e.target.value);
          // Auto-adjust textarea height
          e.target.style.height = 'auto';
          e.target.style.height = Math.min(e.target.scrollHeight, 300) + 'px';
        }}
        rows={1}
      />
      
      <button
        onClick={() => onDelete?.(block._id)}
        className="absolute right-2 top-2 p-2 opacity-0 group-hover:opacity-100 rounded-lg hover:bg-red-100 text-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95"
        aria-label="Delete heading block"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default HeadingBlock;
