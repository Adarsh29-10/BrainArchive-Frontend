import { useParams } from 'react-router-dom';
import BlockRenderer from '../components/blocks/BlockRenderer';
import EditorSidebar from '../components/sidebars/EditorSidebar';
import {useEditorStore} from '../hooks/useEditorStore';
import { EditorSidebarMobile } from '../components/sidebars/EditorSidebarMobile';
import { NotebookLoadingState, NotebookErrorState } from '../../../shared/ui/LoaderStates'

function EditorPage() {
    const { notebookId } = useParams<{ notebookId: string | undefined}>();
    const {blocks, addBlock, updateBlock, deleteBlock, isPending, isError, focusedBlockId, setFocusedBlockId, moveBlockFocus} = useEditorStore(notebookId);

    if (isPending) return <NotebookLoadingState />;
    if (isError) return <NotebookErrorState />;
  
  
    return (
      <div className="h-full flex min-h-0 overflow-hidden bg-zinc-950 relative">

        
        <div className="block sm:hidden">
          <EditorSidebarMobile 
            addBlock={addBlock}
            notebookId={notebookId!}
          />
        </div>
        

        <div className="hidden sm:block">
          <EditorSidebar addBlock={addBlock} notebookId={notebookId!} />
        </div>

        {/* Main editor content  */}
        <main className="flex-1 min-h-0 pl-5 pr-2 sm:px-6 py-3 overflow-y-auto pb-28 sm:pb-16">

          {/* Header */}
          <div className="mt-2 flex justify-between items-center">
            <p className="text-zinc-500 text-sm font-medium">
              <span className='text-zinc-600'>Last Edit: </span>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

          </div>
            
          
          {/* Blocks */}
          {blocks.map(block => (
            <BlockRenderer
              key={block._id}
              block={block}
              onChange={updateBlock}
              onDelete={deleteBlock}
              autoFocus={focusedBlockId}
              setFocusedBlockId={setFocusedBlockId}
              moveBlockFocus={moveBlockFocus}
            />
          ))}
              
        </main>

      </div>

    );
}

export default EditorPage;
