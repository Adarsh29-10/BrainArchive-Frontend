import {useRef, useEffect} from 'react';
import { X } from "lucide-react";
import type { Block } from "../../types/block";

interface DividerBlockProps {
    block: Block;
    onChange: (id: string, value: string) => void;
    onDelete?: (id: string) => void;
    autoFocus: string | null; 
    readOnly?: boolean;
}

function DividerBlock({block, onDelete, autoFocus, readOnly = false}: DividerBlockProps) {
    const dividerRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
        if(autoFocus === block._id){
            dividerRef.current?.focus()
        }
    }, [autoFocus, block._id])
    
    return (
        <>
            <div 
                ref={dividerRef}
                tabIndex={-1}
                className="relative my-6 group "
            >
                <hr className="border-zinc-700" />
                {!readOnly && (
                    <button
                        onClick={() => {
                            if (block._id) {
                                onDelete?.(block._id);
                            }
                        }}
                        className="absolute -bottom-2.5 right-0 opacity-100 group-hover:opacity-100 text-red-600 hover:bg-red-100 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>
        </>
    )
}

export default DividerBlock
