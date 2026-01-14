import type { Block, BlockType } from "../types/block";
import {useState} from 'react'
import { useGetNotebookById, useUpdateNotebookBlock } from "./useNotebooks";

export const useEditorStore = () => {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const getNotebookMutation = useGetNotebookById();
    const updateBlockMutation = useUpdateNotebookBlock();

    const addBlock = (type : BlockType ) => {
        setBlocks(prev => [
            ...prev,
            {
                _id: crypto.randomUUID(),
                type: type,
                content: '',
            },
        ]);
    };

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

    return {
        blocks,
        setBlocks,
        addBlock,
        updateBlock,
        deleteBlock
    }
}
