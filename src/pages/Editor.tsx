import { useParams } from 'react-router-dom';
import BlockRenderer from '../components/blocks/BlockRenderer';
import EditorSidebar from '../components/sidebars/EditorSidebar';
import {useEditorStore} from '../hooks/useEditorStore';
import { useUpdateNotebookBlock } from '../hooks/useNotebooks';

function Editor() {
    const { notebookId } = useParams<{ notebookId: string | undefined}>();
    const {blocks, addBlock, updateBlock, deleteBlock, isError, isPending} = useEditorStore(notebookId);
    const updateBlockMutation = useUpdateNotebookBlock();
  

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

        <div className="hidden sm:block">
          <EditorSidebar addBlock={addBlock} />
        </div>

        {/* Main editor content  */}
        <main className="flex-1 px-6 py-3 overflow-y-auto">

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
            />
          ))}
        </main>

      </div>

    );
}

export default Editor;
