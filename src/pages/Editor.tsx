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

        
        <div className="fixed bottom-0 left-0 right-0 z-50 block sm:hidden">
          <EditorSidebarMobile addBlock={addBlock}/>
        </div>
        

        <div className="hidden sm:block">
          <EditorSidebar addBlock={addBlock} />
        </div>

        {/* Main editor content  */}
        <main className="flex-1 px-6 py-3 overflow-y-auto pb-[60vh]">

          {/* Header */}
          <div className="flex justify-between items-center">
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
              className="px-4 py-1 bg-blue-500 text-white rounded-lg font-semibold"
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
