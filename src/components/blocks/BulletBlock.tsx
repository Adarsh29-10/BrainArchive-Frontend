import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BulletBlockProps {
  block: {
    _id: string;
    content: string;
  };
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
  autoFocus: string | null;
}

function BulletBlock({ block, onChange, onDelete, autoFocus }: BulletBlockProps) {
  const lines = block.content.split("\n");
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  useEffect(() => {
    if (autoFocus === block._id) {
      textareaRefs.current[0]?.focus();
    }
  }, [autoFocus, block._id]);

  useEffect(() => {
    lines.forEach((_, i) => {
      const el = textareaRefs.current[i];
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    });
  }, [lines]);

  useEffect(() => {
    if (focusIndex === null) return;
    textareaRefs.current[focusIndex]?.focus();
    requestAnimationFrame(() => {
      setFocusIndex(null);
    });
  }, [focusIndex]);

  useEffect(() => {
    const handleResize = () => {
      textareaRefs.current.forEach(el => {
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative group ml-4">
      <div className="px-3 rounded-lg hover:bg-pink-50/20 transition-all">
        {lines.map((line, index) => (
          <div key={index} className="flex items-start gap-3 group/bullet">
            <div className="pt-[6px] select-none text-gray-600">•</div>

            <textarea
              ref={el => {
                textareaRefs.current[index] = el;
              }}
              rows={1}
              value={line}
              placeholder="Bullet point..."
              className="flex-1 resize-none bg-transparent outline-none px-2 pt-1 pb-3 rounded-sm transition-all overflow-hidden"
              onChange={e => {
                const newLines = [...lines];
                newLines[index] = e.target.value;
                onChange(block._id, newLines.join("\n"));
              }}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const cursor = e.currentTarget.selectionStart;
                  const current = lines[index];
                  const before = current.slice(0, cursor);
                  const after = current.slice(cursor);

                  const newLines = [...lines];
                  newLines[index] = before;
                  newLines.splice(index + 1, 0, after);

                  onChange(block._id, newLines.join("\n"));
                  setFocusIndex(index + 1);
                }
              }}
            />

            {lines.length > 1 && (
              <button
                onClick={() => {
                  const newLines = lines.filter((_, i) => i !== index);
                  onChange(block._id, newLines.join("\n"));
                }}
                className="opacity-0 group-hover/bullet:opacity-100 p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => onDelete?.(block._id)}
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-100 rounded-lg"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default BulletBlock;
