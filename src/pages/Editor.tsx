import { useParams } from 'react-router-dom';
import BlockRenderer from '../components/blocks/BlockRenderer';
import EditorSidebar from '../components/sidebars/EditorSidebar';
import {useEditorStore} from '../hooks/useEditorStore';
import { useUpdateNotebookBlock } from '../hooks/useNotebooks';
import { EditorSidebarMobile } from '../components/sidebars/EditorSidebarMobile';
import { NotebookLoadingState, NotebookErrorState } from '../components/loaders/LoaderStates';

function Editor() {
    const { notebookId } = useParams<{ notebookId: string | undefined}>();
    const {blocks, addBlock, updateBlock, deleteBlock, isPending, isError, focusedBlockId} = useEditorStore(notebookId);
    const updateBlockMutation = useUpdateNotebookBlock();

    const handleSaveBlocks = () => {
        if (!notebookId) return;

        updateBlockMutation.mutate({
          notebookId,
          blocks
        });
    }

    if (isPending) return <NotebookLoadingState />;
    if (isError) return <NotebookErrorState />;
  
  
    return (
      <div className="h-full flex overflow-hidden bg-zinc-950">

        
        <div className="block sm:hidden">
          <EditorSidebarMobile addBlock={addBlock} handleSaveBlocks={handleSaveBlocks} isSaving={updateBlockMutation.isPending}/>
        </div>
        

        <div className="hidden sm:block">
          <EditorSidebar addBlock={addBlock} />
        </div>

        {/* Main editor content  */}
        <main className="flex-1 pl-5 pr-2 sm:px-6 py-3 overflow-y-auto pb-[10vh] sm:pb-[60vh] scrollbar-hide">

          {/* Header */}
          <div className="mt-12 flex justify-between items-center">
            <p className="text-zinc-500 text-sm font-medium">
              <span className='text-zinc-600'>Last Edit: </span>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          
            <button
              onClick={handleSaveBlocks}
              disabled={updateBlockMutation.isPending || blocks.length === 0}
              className={`px-4 py-1 rounded-lg font-semibold hidden sm:block
                ${updateBlockMutation.isPending || blocks.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white"
                }`}
            >
              {updateBlockMutation.isPending ? "Saving..." : "Save"}
            </button>

          </div>
            

          {/* Blocks */}
          {blocks.map(block => (
            <BlockRenderer
              key={block._id}
              block={block}
              onChange={updateBlock}
              onDelete={deleteBlock}
              autoFocus={focusedBlockId}
            />
          ))}
        </main>

      </div>

    );
}

export default Editor;
