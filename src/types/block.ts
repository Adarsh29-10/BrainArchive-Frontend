export type BlockType =
    'heading' | 'heading1' | 'heading2' | 'paragraph' | 'document' | 'image' | 'video' | 'code' | 'link' | 'bullet' | 'divider';

export type TextBlockType = 'heading' | 'heading1' | 'heading2' | 'paragraph';

export interface Block {
    _id?: string;
    type: BlockType;
    content: string;
}