import type { TextBlockType } from '../../types/block';

export const TEXT_BLOCK_TYPES: TextBlockType[] = [
  'heading',
  'heading1',
  'heading2',
  'paragraph',
];

const BASE_TEXTAREA =
  'w-full focus:outline-none resize-none overflow-hidden bg-zinc-950 text-white select-text pr-6';

// Variants
export const TEXT_BLOCK_VARIANTS = {

  heading: {
    textareaClassName: `${BASE_TEXTAREA} text-4xl font-bold mt-8`,
    placeholder: 'Heading...',
  },

  heading1: {
    textareaClassName: `${BASE_TEXTAREA} text-2xl font-bold mt-4 px-0.5`,
    placeholder: 'Heading1...',
  },

  heading2: {
    textareaClassName: `${BASE_TEXTAREA} text-lg sm:text-xl font-bold mt-3 px-0.5`,
    placeholder: 'Heading2...',
  },

  paragraph: {
    containerClassName: 'relative -mb-2 group select-text',
    textareaClassName: `${BASE_TEXTAREA} text-base sm:text-lg leading-relaxed mt-1 pl-2`,
    placeholder: 'Write something...',
  },

  paragraph1: {
    containerClassName: 'relative -mb-2 group select-text',
    textareaClassName: `${BASE_TEXTAREA} text-lg sm:text-xl leading-relaxed mt-1 pl-2`,
    placeholder: 'Write something...',
  },
};
