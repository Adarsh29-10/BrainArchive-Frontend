import { useEffect, useState } from 'react';
import { SIDEBAR_SECTIONS } from './SidebarPalette';
import type { BlockType } from '../../types/block';
import { X } from 'lucide-react';

type Props = {
  addBlock: (type: BlockType) => void;
};

export const EditorSidebarMobile = ({ addBlock }: Props) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [keyboardInset, setKeyboardInset] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const viewport = window.visualViewport;

    const updateKeyboardInset = () => {
      const inset = Math.max(0, window.innerHeight - (viewport.height + viewport.offsetTop));
      setKeyboardInset(inset);
    };

    updateKeyboardInset();
    viewport.addEventListener('resize', updateKeyboardInset);
    viewport.addEventListener('scroll', updateKeyboardInset);
    window.addEventListener('resize', updateKeyboardInset);

    return () => {
      viewport.removeEventListener('resize', updateKeyboardInset);
      viewport.removeEventListener('scroll', updateKeyboardInset);
      window.removeEventListener('resize', updateKeyboardInset);
    };
  }, []);

  return (
    <>
      {/* Mobile toolbar anchored above keyboard */}
      <div
        className="fixed left-0 right-0 z-40 bg-zinc-900 border-y border-zinc-500 py-2"
        style={{ bottom: `calc(${keyboardInset}px + env(safe-area-inset-bottom, 0px))` }}
      >
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
        </div>
      </div>

      {/* Blocks Panel  */}
      {activeSection !== null && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          
          {/* Blocks panel floating above the toolbar */}
          <div
            className="fixed left-0 right-0 py-2 bg-zinc-900 border-y border-zinc-500 flex gap-2.5 pointer-events-auto"
            style={{ bottom: `calc(${keyboardInset + 50}px + env(safe-area-inset-bottom, 0px))` }}
          >
            
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
