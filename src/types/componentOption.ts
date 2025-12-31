export type ComponentOptionType = 'heading' | 'paragraph' | 'pdf' | 'image' | 'video' | 'code';

export interface ComponentOption {
  id: ComponentOptionType;
  label: string;
  icon: string;
  description: string;
}

export const COMPONENT_OPTIONS: ComponentOption[] = [
  {
    id: 'heading',
    label: 'Heading',
    icon: '📝',
    description: 'Add a section heading'
  },
  {
    id: 'paragraph',
    label: 'Paragraph',
    icon: '📄',
    description: 'Add text content'
  },
  {
    id: 'image',
    label: 'Image',
    icon: '🖼️',
    description: 'Add an image'
  },
  {
    id: 'video',
    label: 'Video',
    icon: '🎥',
    description: 'Embed a video'
  },
  {
    id: 'code',
    label: 'Code',
    icon: '💻',
    description: 'Add code block'
  },
  {
    id: 'pdf',
    label: 'PDF',
    icon: '📕',
    description: 'Upload PDF file'
  }
];
