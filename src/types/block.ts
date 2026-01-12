export type BlockType =
    'heading' | 'heading1' | 'paragraph' | 'document' | 'image' | 'video' | 'code' | 'link' | 'bullet';


export interface Block {
    _id: string;
    type: BlockType;
    content: string;
}