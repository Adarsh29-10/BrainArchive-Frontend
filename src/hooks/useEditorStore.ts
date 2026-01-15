import type { Block, BlockType } from "../types/block";
import {useState, useEffect} from 'react'
import { useGetNotebookById } from "./useNotebooks";

export const useEditorStore = (notebookId : string | undefined) => {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const {data, isError, isPending} = useGetNotebookById(notebookId);
  
    useEffect(() => {
        if (!data?.blocks) return;

        const blocksWithIds = data.blocks.map((block: Block) => ({
        _id: crypto.randomUUID(),
        type: block.type,
        content: block.content
        }))

        setBlocks(blocksWithIds)
        
    }, [data]);

    
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
        deleteBlock,
        isError,
        isPending
    }
}
