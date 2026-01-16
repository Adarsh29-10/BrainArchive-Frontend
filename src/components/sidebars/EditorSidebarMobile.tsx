import { useState } from 'react';
import { SIDEBAR_SECTIONS } from './SidebarPalette';
import type { BlockType } from '../../types/block';
import { ChevronUp } from 'lucide-react';

type Props = {
    addBlock: (type: BlockType) => void;
}

export const EditorSidebarMobile = ({ addBlock }: Props) => {
  const [activeSection, setActiveSection] = useState(SIDEBAR_SECTIONS[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      
      {isExpanded && (
        <div className='fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto'>
          {/* Header with section name and close button */}
          <div className='sticky top-0 bg-white border-b-2 border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-2xl'>

            <h3 className='text-lg font-bold text-gray-900'>{activeSection.title}</h3>

            <button
              onClick={() => setIsExpanded(false)}
              className='p-1 hover:bg-gray-100 rounded-lg transition-colors'
              aria-label='Close panel'
            >
              <ChevronUp size={24} className='text-gray-600' />
            </button>
          </div>

          {/* Blocks grid */}
          <div className='grid grid-cols-2 gap-3 p-4'>
            {activeSection.blocks.map((block) => (
              <button
                key={block.label}
                onClick={() => {
                  addBlock(block.type as BlockType);
                  setIsExpanded(false);
                }}
                className='p-4 bg-gradient-to-br from-pink-50 to-yellow-50 border-2 border-pink-200 rounded-lg hover:border-pink-400 hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center gap-2'
              >
                <block.Icon size={28} className='text-pink-500' />
                <span className='text-sm font-semibold text-gray-700'>{block.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sticky bottom bar - always visible */}
      <div className='fixed bottom-0 left-0 right-0 z-40 bg-pink-200/40 border-t-2 border-gray-200 px-2 py-2 safe-area-inset-bottom'>
        
        {/* Section tabs - horizontal scroll on mobile */}
        <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
         
          {SIDEBAR_SECTIONS.map((section) => (
            <button
              key={section.title}
              onClick={() => {
                setActiveSection(section);
                setIsExpanded(true);
              }}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                activeSection.title === section.title
                  ? 'bg-gradient-to-b from-pink-700 to-pink-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Backdrop when expanded */}
      {isExpanded && (
        <div
          className='fixed inset-0 bg-black/40 z-30'
          onClick={() => setIsExpanded(false)}
          aria-label='Close panel backdrop'
        />
      )}
    </>
  );
}
