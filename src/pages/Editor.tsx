import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import BlockRenderer from '../components/blocks/BlockRenderer';
import type { Block } from '../types/block';
import { useGetNotebookById, useUpdateNotebookBlock } from '../hooks/useNotebooks';
import EditorSidebar from '../components/sidebars/EditorSidebar';
import EditorSidebarMobile from '../components/sidebars/EditorSidebarMobile';
import {useEditorStore} from '../hooks/useEditorStore';

function Editor() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const {blocks, setBlocks, addBlock, updateBlock, deleteBlock} = useEditorStore();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const getNotebookMutation = useGetNotebookById();
  const updateBlockMutation = useUpdateNotebookBlock();


  useEffect(() => {
    // Fetch notebook on mount
    if (notebookId) {
      getNotebookMutation.mutate(notebookId);
    }
  }, [notebookId]);

  useEffect(() => {
    // Initialize blocks from fetched notebook data
    const notebookData = getNotebookMutation.data;
    if (notebookData?.blocks && Array.isArray(notebookData.blocks)) {
      const blocksWithIds = notebookData.blocks.map((block: Block) => ({
        _id: crypto.randomUUID(),
        type: block.type,
        content: block.content,
      }));
      setBlocks(blocksWithIds);
    }
  }, [getNotebookMutation.data, notebookId, setBlocks]);


  // Show loading state
  if (getNotebookMutation.isPending) return <div>Loading notebook...</div>;
  if (getNotebookMutation.isError) return <div>Error loading notebook</div>;


  const handleSaveBlocks = () => {
    if (!notebookId) return;

    updateBlockMutation.mutate({
      notebookId,
      blocks
    });
  }

  

  return (
    <div className="h-full flex overflow-hidden ">

      {/* Desktop Sidebar - visible only on md and larger screens */}
      <div className="hidden md:block">
        <EditorSidebar addBlock={addBlock} />
      </div>

      {/* Main editor content  */}
      <main className="flex-1 px-6 py-3 overflow-y-auto">

        {/* Header */}
        <div className="mb-8 pb-1 border-b-2 border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              {/* Mobile menu button - visible only on sm screens */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open sidebar"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Today's Learning
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <button
              onClick={handleSaveBlocks}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>

        {/* Blocks */}
        {blocks.map(block => (
          <BlockRenderer
            key={block._id}
            block={block}
            onChange={updateBlock}
            onDelete={deleteBlock}
          />
        ))}
      </main>

      {/* Mobile Sidebar - visible only on sm screens */}
      <EditorSidebarMobile 
        addBlock={addBlock} 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />

    </div>

  );
}

export default Editor;
