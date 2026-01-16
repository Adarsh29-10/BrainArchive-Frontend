import { useParams } from 'react-router-dom';
import BlockRenderer from '../components/blocks/BlockRenderer';
// import EditorSidebar from '../components/sidebars/EditorSidebar';
import {useEditorStore} from '../hooks/useEditorStore';
import { useUpdateNotebookBlock } from '../hooks/useNotebooks';
import { EditorSidebarMobile } from '../components/sidebars/EditorSidebarMobile';

function Editor() {
    const { notebookId } = useParams<{ notebookId: string | undefined}>();
    const {blocks, addBlock, updateBlock, deleteBlock, isPending, isError, focusedBlockId} = useEditorStore(notebookId);
    const updateBlockMutation = useUpdateNotebookBlock();

    // const isMobile = window.innerWidth < 640;


    const handleSaveBlocks = () => {
        if (!notebookId) return;

        updateBlockMutation.mutate({
          notebookId,
          blocks
        });
    }

    if (isPending) return <div className='text-center'>Loading your notebook...</div>;
    if (isError) return <div>Error loading notebook</div>;
  
  

    return (
      <div className="h-full flex overflow-hidden ">

        
        <div className="fixed bottom-0 left-0 right-0 z-50 ">
          <EditorSidebarMobile addBlock={addBlock}/>
        </div>
        

        {/* <div className="block sm:hidden">
          <EditorSidebar addBlock={addBlock} />
        </div> */}

        {/* Main editor content  */}
        <main className="flex-1 px-6 py-3 overflow-y-auto pb-[60vh]">

          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">
              <span className='text-gray-600'>Last Edit: </span>
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
