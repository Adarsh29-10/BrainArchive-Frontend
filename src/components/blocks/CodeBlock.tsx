import { X } from 'lucide-react';
import Editor from "@monaco-editor/react";
import { useRef, useEffect } from 'react';

interface CodeBlockProps {
  block: {
    _id: string;
    content: string;
    language?: string;
  };
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
  autoFocus: string | null;
}

function CodeBlock({ block, onChange, onDelete, autoFocus }: CodeBlockProps) {
  const language = block.language || 'JavaScript';
  const editorRef = useRef<{ focus: () => void } | null>(null);

  const isMobile = window.innerWidth < 640; 
  const fontSize = isMobile ? 12 : 16;
  const lineHeight = isMobile ? 18 : 20;


  useEffect(() => {
    if (autoFocus === block._id && editorRef.current) {
      editorRef.current.focus?.();
    }
  }, [autoFocus, block._id]);


  return (
    <div className="relative group mb-4">
      <div className="border-2 border-transparent rounded-lg overflow-hidden hover:bg-pink-50/20 transition-all focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-100">
        <div className="bg-gray-900 rounded-t-lg px-4 py-2 flex items-center justify-between">
          <span className="text-sm font-mono text-gray-400">{language}</span>
          {/* Language selector could go here */}
        </div>
        
        <Editor
          height="300px"
          language={language}
          value={block.content}
          onChange={(value) => onChange(block._id, value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            fontSize: fontSize,
            lineHeight: lineHeight,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>

      {/* Delete button - show on hover */}
      <button
        onClick={() => onDelete?.(block._id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all z-10"
        aria-label="Delete code block"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default CodeBlock;
