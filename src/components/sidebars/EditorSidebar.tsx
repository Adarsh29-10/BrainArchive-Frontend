import { ChevronDown } from "lucide-react"
import {useState} from 'react';
import type { BlockType } from "../../types/block";
import { SIDEBAR_SECTIONS } from "./SidebarPalette";
import { useEditorStore } from "../../hooks/useEditorStore";

type Props = {
    addBlock: (type: BlockType) => void;
}

function EditorSidebar({addBlock} : Props) {
    // const {addBlock} = useEditorStore()

    const [expandedSections, setExpandedSections] = useState<string[]>([SIDEBAR_SECTIONS[0].title])

    const toggleSection = (title: string) => {
        setExpandedSections(prev => 
            prev.includes(title) 
                ? prev.filter(t => t !== title)
                : [...prev, title]
        )
    }

    return (
        <aside className="sm:w-36 md:w-48 h-full bg-gray-50 border-r border-gray-200 flex flex-col flex-shrink-0">
            
            {/* Header */}
            <div className="px-4 py-4 border-b border-gray-200 bg-white flex-shrink-0">
                <h2 className="text-lg font-bold text-gray-900">Add Content</h2>
                <p className="text-xs text-gray-500 mt-1">Click to insert blocks</p>
            </div>

            {/* Sections - Scrollable only this part*/}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
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
                            <div className="space-y-2 sm:pl-0 md:pl-6">
                                {section.blocks.map((block) => (
                                    <button
                                        key={block.label}
                                        onClick={() => addBlock(block.type as BlockType)}
                                        className="mx-1 px-3 py-2.5 bg-white border-2 border-gray-200 rounded-lg hover:border-pink-400 hover:bg-pink-50 active:scale-95 transition-all duration-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 group"
                                        title={`Add ${block.label}`}
                                    >
                                        <block.Icon size={18} className="text-pink-600 group-hover:scale-110 transition-transform" />
                                        
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer Info */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex-shrink-0">
                <p>💡 Tip: Organize your content with different block types for better structure.</p>
            </div>
        </aside>
    )
}

export default EditorSidebar