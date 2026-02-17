import type { Block, BlockType } from "../types/block";
import {useState, useEffect } from 'react'
import { useAddNotebookBlock, useDeleteNotebookBlock, useGetNotebookById } from "./useNotebooks";

export const useEditorStore = (notebookId: string | undefined) => {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);
    const {data, isError, isPending} = useGetNotebookById(notebookId); 
  
    const addBlockMutation = useAddNotebookBlock();
    const deleteBlockMutation = useDeleteNotebookBlock();

  
    useEffect(() => {
      if (!data?.blocks) return;

      requestAnimationFrame(() => {
          setBlocks(data.blocks);
      });
    }, [data]);

  
    const addBlock = async (type: BlockType) => {
      if (!notebookId) return;

      const id = crypto.randomUUID();

      const index = blocks.findIndex(b => b._id === focusedBlockId);
      const prevBlockId = index === -1 ? "" : (focusedBlockId || "");

      const newBlock: Block = {
        _id: id,
        type,
        content: "",
      };

    
      setBlocks(prev => {
        if (index === -1) return [...prev, newBlock];

        const copy = [...prev];
        copy.splice(index + 1, 0, newBlock);
        return copy;
      });

      setFocusedBlockId(id);

      
      try {
        await addBlockMutation.mutateAsync({
          notebookId,
          _id: id,
          type,
          prevBlockId,
        });
      } catch (err) {
        console.error("Failed to persist block", err);
      }
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

    const deleteBlock = async (id:string) => {
        setBlocks(prev => 
        prev.filter(block => block._id!==id)
        )

        try {
          await deleteBlockMutation.mutateAsync({
            notebookId,
            _id: id,
          });
        } catch (err) {
          console.error("Failed to delete block", err);
        }
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
