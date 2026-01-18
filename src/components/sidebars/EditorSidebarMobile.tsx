import { useState } from 'react';
import { SIDEBAR_SECTIONS } from './SidebarPalette';
import type { BlockType } from '../../types/block';
import { X } from 'lucide-react';
import { useUpdateNotebookBlock } from '../../hooks/useNotebooks';
import { useParams } from 'react-router-dom';
import { useEditorStore } from '../../hooks/useEditorStore';

type Props = {
  addBlock: (type: BlockType) => void;
  handleSaveBlocks: () => void;
};

export const EditorSidebarMobile = ({ addBlock, handleSaveBlocks }: Props) => {
  const { notebookId } = useParams<{ notebookId: string | undefined}>();
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const {blocks, isPending} = useEditorStore(notebookId);
  const updateBlockMutation = useUpdateNotebookBlock();
 
  return (
    <>
      {/* Minimal Bottom Toolbar */}
      <div className="fixed top-15 left-0 right-0 z-40 bg-zinc-900 border-y border-zinc-500 py-2">
        <div className='flex items-center justify-between pl-2 pr-4'>
          <div className="flex items-center justify-start overflow-x-auto scrollbar-hide">
            {SIDEBAR_SECTIONS.map((section, index) => (
              <button
                key={section.title}
                onClick={() => setActiveSection(activeSection === index ? null : index)}
                className={`px-3 py-2 text-xs whitespace-nowrap border-r border-zinc-500 last:border-r-0 transition-colors ${
                  activeSection === index
                    ? 'text-zinc-100 bg-zinc-800'
                    : 'text-zinc-300 font-semibold hover:text-zinc-100 hover:bg-zinc-800'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          <button
            onClick={handleSaveBlocks}
            disabled={isPending || updateBlockMutation.isPending || blocks.length === 0}
            className={`px-4 py-1 rounded-lg font-semibold
              ${isPending || updateBlockMutation.isPending || blocks.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white"
              }`}
          >
            {isPending ? "Loading..." : updateBlockMutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Blocks Panel  */}
      {activeSection !== null && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          
          {/* Blocks panel on right side */}
          <div className="fixed top-16 w-full py-2 bg-zinc-900 border-y border-zinc-500 flex gap-2.5 pointer-events-auto ">
            
            {/* Close button */}
            <div className="flex justify-end p-2 border-b border-zinc-800">
              <button
                onClick={() => setActiveSection(null)}
                className="p-1 text-zinc-400 hover:text-zinc-100"
              >
                <X size={16} />
              </button>
            </div>

            {/* Icons grid */}
            
              <div className="flex gap-3">
                {SIDEBAR_SECTIONS[activeSection].blocks.map((block) => (
                  <button
                    key={block.label}
                    onClick={() => {
                      addBlock(block.type as BlockType);
                      setActiveSection(null);
                    }}
                    className="w-full aspect-square px-1 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                    title={block.label}
                  >
                    <block.Icon size={24} className="text-white" />
                  </button>
                ))}

              </div>
            
          </div>
        </div>
      )}
    </>
  );
};