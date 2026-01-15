import { ChevronDown, X } from "lucide-react"
import {useState} from 'react';
import type { BlockType } from "../../types/block";
import { SIDEBAR_SECTIONS } from "./SidebarPalette";

type Props = {
    addBlock: (type: BlockType) => void;
    isOpen: boolean;
    onClose: () => void;
}

function EditorSidebarMobile({addBlock, isOpen, onClose} : Props) {

    const [expandedSections, setExpandedSections] = useState<string[]>([SIDEBAR_SECTIONS[0].title])

    const toggleSection = (title: string) => {
        setExpandedSections(prev => 
            prev.includes(title) 
                ? prev.filter(t => t !== title)
                : [...prev, title]
        )
    }

    const handleAddBlock = (type: BlockType) => {
        addBlock(type);
        onClose();
    }

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-30"
                onClick={onClose}
            />

            {/* Mobile Drawer */}
            <div className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-gray-50 to-white border-l-2 border-gray-200 flex flex-col z-40 shadow-lg animate-slideIn">
                
                {/* Header */}
                <div className="px-4 py-4 border-b border-gray-200 bg-white flex-shrink-0 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Add Content</h2>
                        <p className="text-xs text-gray-500 mt-1">Click to insert blocks</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Sections - Scrollable */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                    {SIDEBAR_SECTIONS.map((section) => (
                        <div key={section.title} className="space-y-2">
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(section.title)}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
                            >
                                <span className={`font-semibold text-sm ${expandedSections.includes(section.title) ? 'text-gray-900' : 'text-gray-600'}`}>
                                    {section.title}
                                </span>
                                <ChevronDown 
                                    size={16} 
                                    className={`text-gray-500 transition-transform duration-200 ${expandedSections.includes(section.title) ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Block Items */}
                            {expandedSections.includes(section.title) && (
                                <div className="space-y-2 pl-2">
                                    {section.blocks.map((block) => (
                                        <button
                                            key={block.label}
                                            onClick={() => handleAddBlock(block.type as BlockType)}
                                            className="w-full flex items-center gap-3 px-3 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-pink-400 hover:bg-pink-50 active:scale-95 transition-all duration-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 group"
                                            title={`Add ${block.label}`}
                                        >
                                            <block.Icon size={20} className="text-pink-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600 capitalize">
                                                {block.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex-shrink-0">
                    <p>💡 Tap to add blocks to your notes</p>
                </div>
            </div>


        </>
    )
}

export default EditorSidebarMobile
