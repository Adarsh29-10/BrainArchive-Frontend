import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Block } from '../../types/block';

export interface TextBlockProps {
  block: Block;
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
  autoFocus: string | null;
}

export interface TextBlockVariant {
  containerClassName?: string;
  textareaClassName: string;
  placeholder: string;
}

interface BaseBlockProps extends TextBlockProps {
  variant: TextBlockVariant;
}


function BaseBlock({ block, onChange, onDelete, autoFocus, variant }: BaseBlockProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxHeight = 300;

  useEffect(() => {
    if (autoFocus === block._id) {
      textareaRef.current?.focus();
    }
  }, [autoFocus, block._id]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [block.content]);

  useEffect(() => {
    const el = textareaRef.current;

    const handleResize = () => {
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={variant.containerClassName ?? 'relative mb-1 group select-text'}>
      <textarea
        ref={textareaRef}
        className={variant.textareaClassName}
        placeholder={variant.placeholder}
        value={block.content}
        onChange={(e) => {
          if (block._id) {
            onChange(block._id, e.target.value);
          }

          e.target.style.height = 'auto';
          e.target.style.height = `${Math.min(e.target.scrollHeight, maxHeight)}px`;
        }}
        rows={1}
      />

      <button
        onClick={() => {
          if (block._id) {
            onDelete?.(block._id);
          }
        }}
        className='absolute right-0 bottom-3 opacity-0 group-hover:opacity-100 rounded-lg hover:bg-red-100 text-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95'
        aria-label={`Delete ${block.type} block`}
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default BaseBlock;
