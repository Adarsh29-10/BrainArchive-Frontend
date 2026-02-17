import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BulletBlockProps {
  block: {
    _id?: string;
    content: string;
  };
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
  autoFocus: string | null;
  setFocusedBlockId: (id: string | null) => void;
  moveBlockFocus: (currentId: string | undefined, direction: "up" | "down") => void;
  readOnly?: boolean;
}

function BulletBlock({ block, onChange, onDelete, autoFocus, setFocusedBlockId, moveBlockFocus, readOnly = false }: BulletBlockProps) {
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
    <div className="relative group ml-2 mb-0.5 select-text">
      <div className="rounded-lg">
        {lines.map((line, index) => (
          <div key={index} className="flex items-start gap-2 group/bullet">
            <div className="select-none ml-2 text-3xl text-white">•</div>

            <textarea
              ref={el => {
                textareaRefs.current[index] = el;
              }}
              rows={1}
              value={line}
              readOnly={readOnly}
              placeholder="Bullet point..."
              className="flex-1 resize-none outline-none pl-2 pt-2 pb-1 pr-6 overflow-hidden bg-zinc-950 text-white select-text"
              onChange={e => {
                if (readOnly) return;

                const newLines = [...lines];
                newLines[index] = e.target.value;
                if (block._id) {
                  onChange(block._id, newLines.join("\n"));
                }
              }}

              onKeyDown={e => {
                if (readOnly) return;

                const el = e.currentTarget;
                const isAtStart = el.selectionStart === 0;
                const isAtEnd = el.selectionStart === el.value.length

                if (e.key === "ArrowUp") {
                  if (index > 0) {
                    e.preventDefault();
                    setFocusIndex(index - 1);
                    return;
                  }
                  if (index === 0 && isAtStart) {
                    e.preventDefault();
                    moveBlockFocus(block._id, "up");
                    return;
                  }
                }

                if (e.key === "ArrowDown") {
                  if (index < lines.length - 1) {
                    e.preventDefault();
                    setFocusIndex(index + 1);
                    return;
                  }
                  if (index === lines.length - 1 && isAtEnd) {
                    e.preventDefault();
                    moveBlockFocus(block._id, "down");
                    return;
                  }
                }

                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const cursor = e.currentTarget.selectionStart;
                  const current = lines[index];
                  const before = current.slice(0, cursor);
                  const after = current.slice(cursor);

                  const newLines = [...lines];
                  newLines[index] = before;
                  newLines.splice(index + 1, 0, after);

                  if (block._id) {
                    onChange(block._id, newLines.join("\n"));
                  }
                  setFocusIndex(index + 1);
                }
              }}

              onFocus={()=>{
                setFocusedBlockId(block._id ?? null)
              }}
              
            />

            {!readOnly && lines.length > 1 && (
              <button
                onClick={() => {
                  const newLines = lines.filter((_, i) => i !== index);
                  if (block._id) {
                    onChange(block._id, newLines.join("\n"));
                  }
                }}
                className="opacity-0 group-hover/bullet:opacity-100 px-1 text-red-600 hover:bg-red-100 rounded"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {!readOnly && (
        <button
          onClick={() => {
            if (block._id) {
              onDelete?.(block._id);
            }
          }}
          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 text-red-600 hover:bg-red-100 rounded-lg"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

export default BulletBlock;
