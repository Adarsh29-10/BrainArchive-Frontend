import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import BlockRenderer from '../components/blocks/BlockRenderer';
import type { Block } from '../types/block';
import { Type, FileText, List, Code2 } from 'lucide-react';
import { useGetNotebookById, useUpdateNotebookBlock } from '../hooks/useNotebooks';

function LearningSession() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const [blocks, setBlocks] = useState<Block[]>([]);
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
      const blocksWithIds = notebookData.blocks.map((block: Block, index: number) => ({
        _id: `${notebookId}-${index}`,
        type: block.type,
        content: block.content,
      }));
      setBlocks(blocksWithIds);
    }
  }, [getNotebookMutation.data, notebookId]);


  // Show loading state
  if (getNotebookMutation.isPending) return <div>Loading notebook...</div>;
  if (getNotebookMutation.isError) return <div>Error loading notebook</div>;

  const addHeading = () => {
    setBlocks(prev => [
      ...prev,
      {
        _id: crypto.randomUUID(),
        type: 'heading',
        content: '',
      },
    ]);
  };

  const addHeading1 = () => {
    setBlocks(prev => [
      ...prev,
      {
        _id: crypto.randomUUID(),
        type: 'heading1',
        content: '',
      },
    ]);
  };

  const addParagraph = () => {
    setBlocks(prev => [
      ...prev,
      {
        _id: crypto.randomUUID(),
        type: 'paragraph',
        content: '',
      }
    ])
  }

  const addBullet = () => {
    setBlocks(prev => [
      ...prev,
      {
        _id: crypto.randomUUID(),
        type: 'bullet',
        content: '',
      }
    ])
  }

  const addCode = () => {
    setBlocks(prev => [
      ...prev,
      {
        _id: crypto.randomUUID(),
        type: 'code',
        content: '',
      }
    ])
  }

  const updateBlock = (id: string, value: string) => {
    setBlocks(prev =>
      prev.map(block =>
        block._id === id
          ? { ...block, content: value }
          : block
      )
    );
  };

  const deleteBlock = (id:string) => {
    setBlocks(prev => 
      prev.filter(block => block._id!==id)
    )
  }


  const handleSaveBlocks = () => {
    if (!notebookId) return;

    updateBlockMutation.mutate({
      notebookId,
      blocks
    });
  }

  
  

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex gap-10 px-6 py-6">

        {/* Main Content */}
        <div className="flex-1 border p-6">
          {/* Header */}
          <div className="mb-8 pb-6 border-b-2 border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Today's Learning</h1>
                <p className="text-gray-500 text-sm font-medium">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <button
                onClick={handleSaveBlocks}
                className='px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2'
              >
                {updateBlockMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Saving...
                  </span>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>

          {blocks.map(block => (
            <BlockRenderer
              key={block._id}
              block={block}
              onChange={updateBlock}
              onDelete={deleteBlock}
            />
          ))}
        </div>

        {/* Sidebar */}
        <aside className="w-72 border-l border-gray-200 p-6 bg-gradient-to-b from-pink-50/30 to-transparent">
          <h2 className="font-bold text-lg mb-6 text-gray-800">Add Content</h2>

          <div className="space-y-3">
            <button
              onClick={addHeading}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-transparent rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 active:scale-95 group"
              aria-label="Add heading block"
            >
              <Type size={20} className="text-pink-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700 group-hover:text-pink-600">Heading</span>
            </button>

            <button
              onClick={addHeading1}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-transparent rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 active:scale-95 group"
              aria-label="Add heading block"
            >
              <Type size={20} className="text-pink-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700 group-hover:text-pink-600">Heading 1</span>
            </button>

            <button
              onClick={addParagraph}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-transparent rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 active:scale-95 group"
              aria-label="Add paragraph block"
            >
              <FileText size={20} className="text-pink-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700 group-hover:text-pink-600">Paragraph</span>
            </button>

            <button
              onClick={addBullet}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-transparent rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 active:scale-95 group"
              aria-label="Add bullet points block"
            >
              <List size={20} className="text-pink-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700 group-hover:text-pink-600">Bullets</span>
            </button>

            <button
              onClick={addCode}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-transparent rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 active:scale-95 group"
              aria-label="Add code block"
            >
              <Code2 size={20} className="text-pink-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700 group-hover:text-pink-600">Code</span>
            </button>
          </div>
        </aside>

      </div>
    </>
  );
}

export default LearningSession;
