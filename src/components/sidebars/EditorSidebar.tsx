import { ChevronDown } from "lucide-react"
import {useState} from 'react';
import type { BlockType } from "../../types/block";
import { SIDEBAR_SECTIONS } from "./SidebarPalette";

type Props = {
    addBlock: (type: BlockType) => void;
}

function EditorSidebar({addBlock} : Props) {

    const [expandedSections, setExpandedSections] = useState<string[]>([SIDEBAR_SECTIONS[0].title])

    const toggleSection = (title: string) => {
        setExpandedSections(prev => 
            prev.includes(title) 
                ? prev.filter(t => t !== title)
                : [...prev, title]
        )
    }

    return (
        <aside className="sm:w-36 md:w-48 h-full bg-zinc-900 border-r border-zinc-800 flex flex-col flex-shrink-0">
            
            {/* Header */}
            <div className="px-4 pb-4 pt-4 border-b border-zinc-800 flex-shrink-0">
                <h2 className="text-lg font-bold text-white">Add Content</h2>
                <p className="text-xs text-zinc-500">Click to insert blocks</p>
            </div>

            {/* Sections - Scrollable only this part*/}
            <div className="flex-1 pt-6 space-y-3 overflow-y-auto">
                {SIDEBAR_SECTIONS.map((section) => (
                    <div key={section.title} className="space-y-2">
                        {/* Section Header */}
                        <button
                            onClick={() => toggleSection(section.title)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors group"
                        >
                            <span className={`font-semibold text-sm ${expandedSections.includes(section.title) ? 'text-white' : 'text-zinc-400'}`}>
                                {section.title}
                            </span>
                            <ChevronDown 
                                size={16} 
                                className={`text-zinc-600 transition-transform duration-200 ${expandedSections.includes(section.title) ? 'rotate-180 text-zinc-300' : ''}`}
                            />
                        </button>

                        {/* Block Items */}
                        {expandedSections.includes(section.title) && (
                            <div className="space-y-2 sm:pl-0 md:pl-6">
                                {section.blocks.map((block) => (
                                    <button
                                        key={block.label}
                                        onClick={() => addBlock(block.type as BlockType)}
                                        className="mx-1 px-3 py-2.5 bg-zinc-800 border-2 border-zinc-700 rounded-lg hover:border-pink-500 hover:bg-pink-950/30 active:scale-95 transition-all duration-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-600/30 group"
                                        title={`Add ${block.label}`}
                                    >
                                        <block.Icon size={18} className="text-pink-500 group-hover:text-pink-400 group-hover:scale-110 transition-all" />
                                        
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer Info */}
            <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900 text-xs text-zinc-500 flex-shrink-0">
                <p>💡 Tip: Organize your content with different block types for better structure.</p>
            </div>
        </aside>
    )
}

export default EditorSidebar