import { X } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface BulletBlockProps {
  block: {
    _id: string;
    content: string;
  };
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
  autoFocus: string;
}

function BulletBlock({ block, onChange, onDelete, autoFocus }: BulletBlockProps) {
  const lines = block.content.split('\n');
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const [focusedLineIndex, setFocusedLineIndex] = useState<number | null>(null);

  // Focus on the block when it's first created
  useEffect(() => {
    if (autoFocus === block._id && textareaRefs.current[0]) {
      textareaRefs.current[0].focus();
    }
  }, [autoFocus, block._id]);

  useEffect(() => {
    if (focusedLineIndex !== null && textareaRefs.current[focusedLineIndex]) {
      setTimeout(() => {
        textareaRefs.current[focusedLineIndex]?.focus();
        setFocusedLineIndex(null); // Reset after focusing
      }, 0);
    }
  }, [focusedLineIndex, lines.length]);

  return (
    <div className="relative group ml-4">

      <div className=" px-3 rounded-lg bg-transparent hover:bg-pink-50/20 transition-all">
        {lines.map((line, index) => (
          <div key={index} className="flex items-start gap-3 group/bullet">

            {/* Bullet */}
            <div className="pt-[6px] select-none text-gray-600 font-medium flex-shrink-0">•</div>

            {/* Text */}
            <textarea
              ref={(el) => {
                if (el) textareaRefs.current[index] = el;
              }}
              rows={1}
              className="flex-1 w-full text-base leading-relaxed outline-none resize-none bg-transparent border-transparent focus:border-pink-400 focus:bg-pink-50/40 px-2 pt-1 mr-2 rounded-sm transition-all no-scrollbar"
              value={line}
              placeholder="Bullet point..."
              onChange={(e) => {
                const newLines = [...lines];
                newLines[index] = e.target.value;
                onChange(block._id, newLines.join('\n'));

                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';

              }}
              
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  const newLines = [...lines];
                  const currentValue = newLines[index];
                  const cursorPosition = e.currentTarget.selectionStart;
                  
                  // Split at cursor position
                  const beforeCursor = currentValue.substring(0, cursorPosition);
                  const afterCursor = currentValue.substring(cursorPosition);
                  
                  newLines[index] = beforeCursor;
                  newLines.splice(index + 1, 0, afterCursor);
                  
                  onChange(block._id, newLines.join('\n'));
                  
                  // Set focus to the newly created bullet line
                  setFocusedLineIndex(index + 1);
                }
              }}
            />

            {/* Delete button - show on hover */}
            {lines.length > 1 && (
              <button
                onClick={() => {
                  const newLines = lines.filter((_, i) => i !== index);
                  onChange(block._id, newLines.join('\n'));
                }}
                className="opacity-0 group-hover/bullet:opacity-100 p-1 text-red-600 hover:bg-red-100 rounded transition-all flex-shrink-0 mr-14"
                aria-label="Delete this bullet "
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Delete entire block button */}
      <button
        onClick={() => onDelete?.(block._id)}
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
        aria-label="Delete bullet block"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default BulletBlock;
