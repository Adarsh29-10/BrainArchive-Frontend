import { X } from 'lucide-react';
import Editor from "@monaco-editor/react";
import { useRef, useEffect, useState } from 'react';

interface CodeBlockProps {
  block: {
    _id?: string;
    content: string;
    language?: string;
  };
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
  autoFocus: string | null;
}

const LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },  // monaco recognizes "cpp"
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
  { label: "TypeScript", value: "typescript" },
  { label: "JSON", value: "json" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
];

function CodeBlock({ block, onChange, onDelete, autoFocus }: CodeBlockProps) {
  const editorRef = useRef<{ focus: () => void } | null>(null);

  // Local state but synced with block.language
  const [selectedLang, setSelectedLang] = useState(block.language || "");

  // Sync language ONLY when block.language changes
  useEffect(() => {
    if (block.language) {
      requestAnimationFrame(() => {
        setSelectedLang(block.language || "");
      });
    }
  }, [block.language]);

  // Mobile responsive font size
  const isMobile = window.innerWidth < 640; 
  const fontSize = isMobile ? 12 : 16;
  const lineHeight = isMobile ? 18 : 20;

  // Auto focus
  useEffect(() => {
    if (autoFocus === block._id && editorRef.current) {
      editorRef.current.focus?.();
    }
  }, [autoFocus, block._id]);

  return (
    <div className="relative group mb-4 pr-4 select-none">
      <div className="border-2 border-transparent rounded-lg overflow-hidden ">

        {/* Header */}
        <div className="bg-zinc-800 rounded-t-lg px-4 py-2 flex items-center justify-between">
          <select
            value={selectedLang}
            onChange={(e) => {
              const lang = e.target.value;
              setSelectedLang(lang);                     // update UI instantly
              // onUpdateLanguage(block._id, lang);        // persist to block state
            }}
            className="bg-zinc-800 text-gray-300 text-sm font-mono rounded px-2 py-1 outline-none hover:bg-zinc-700"
          >
            <option value="">Select Language</option>
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Monaco Editor */}
        <Editor
          height="30vh"
          language={selectedLang || undefined}
          value={block.content}
          onChange={(value) => {
            if (block._id) {
              onChange(block._id, value || "");
            }
          }}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            fontSize,
            lineHeight,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>

      {/* Delete button */}
      <button
        onClick={() => {
          if (block._id) {
            onDelete?.(block._id);
          }
        }}
        className="absolute top-2 right-6 opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:scale-110 hover:text-red-800 rounded-lg transition-all z-10"
        aria-label="Delete code block"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default CodeBlock;
