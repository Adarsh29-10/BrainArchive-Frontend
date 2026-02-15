import type { Block, BlockType } from "../types/block";
import {useState, useEffect } from 'react'
import { useGetNotebookById } from "./useNotebooks";

export const useEditorStore = (notebookId: string | undefined) => {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);
    const {data, isError, isPending} = useGetNotebookById(notebookId); 
  
    useEffect(() => {
        if (!data?.blocks) return;

        const blocksWithIds = data.blocks.map((block: Block) => ({
            _id: crypto.randomUUID(),
            type: block.type,
            content: block.content
        }))

        requestAnimationFrame(() => {
            setBlocks(blocksWithIds);
        });
        
    }, [data]);
   
    const addBlock = (type: BlockType) => {
        const id = crypto.randomUUID();

        setBlocks(prev => {
            const index = prev.findIndex(b => b._id === focusedBlockId);

            const newBlock = {
                _id: id,
                type,
                content: "",
            };

            if (index === -1) {
                return [...prev, newBlock];
            }

            const newBlocks = [...prev];
            newBlocks.splice(index + 1, 0, newBlock);
            return newBlocks;
        });

        setFocusedBlockId(id);
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

    const moveBlockFocus = (currentId: string | undefined, direction: "up" | "down") => {
        const index = blocks.findIndex(b => b._id === currentId)

        if(index === -1) return;

        if(direction == "up" && index > 0) {
            const prevBlock = blocks[index - 1]._id
            if(prevBlock){
                setFocusedBlockId(prevBlock)
            }
        }

        if(direction == "down" && index < blocks.length - 1) {
            const nextBlock = blocks[index + 1]._id
            if (nextBlock){
                setFocusedBlockId(nextBlock)
            }
        }
    }

    return {
        blocks,
        setBlocks,
        addBlock,
        updateBlock,
        deleteBlock,
        focusedBlockId,
        setFocusedBlockId,
        isError,
        isPending,
        moveBlockFocus
    }
}
