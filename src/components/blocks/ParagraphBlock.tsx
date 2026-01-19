import { X } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface ParagraphBlockProps {
  block: {
    _id?: string;
    content: string;
  };
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
  autoFocus: string | null;
}

function ParagraphBlock({block, onChange, onDelete, autoFocus}: ParagraphBlockProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus === block._id) {
      textareaRef.current?.focus();
    }
  }, [autoFocus, block._id]);

   useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";               
    el.style.height = `${el.scrollHeight}px`; 
  }, [block.content]);

  useEffect(() => {
    const el = textareaRef.current;

    const handleResize = () => {
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <div className="relative mb-0.5 group select-text">
      <textarea
        ref={textareaRef}
        className="w-full text-base sm:text-lg leading-relaxed pl-2 pr-6 mt-1 focus:outline-none resize-none overflow-hidden bg-zinc-950 text-white select-text"
        placeholder="Write something..."
        value={block.content}
        onChange={(e) => {
          if (block._id) {
            onChange(block._id, e.target.value);
          }
          // Auto-adjust textarea height
          e.target.style.height = 'auto';
          e.target.style.height = Math.min(e.target.scrollHeight, 400) + 'px';
        }}
        rows={1}
      />
      
      <button
        onClick={() => {
          if (block._id) {
            onDelete?.(block._id);
          }
        }}
        className="absolute right-0 top-2 opacity-0 group-hover:opacity-100 rounded-lg hover:bg-red-100 text-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95"
        aria-label="Delete paragraph block"
      >
        <X size={20} />
      </button>
    </div>
  )
}

export default ParagraphBlock