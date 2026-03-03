import type { TextBlockType } from '../../types';

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
    textareaClassName: `${BASE_TEXTAREA} text-4xl sm:text-4xl font-bold mt-8 mb-4`,
    placeholder: 'Heading...',
  },

  heading1: {
    textareaClassName: `${BASE_TEXTAREA} text-2xl font-bold mt-2 mb-1 px-1`,
    placeholder: 'Heading1...',
  },

  heading2: {
    textareaClassName: `${BASE_TEXTAREA} text-lg sm:text-xl font-semibold mt-2 mb-1 px-1`,
    placeholder: 'Heading2...',
  },

  paragraph: {
    containerClassName: 'relative mb-2 group select-text',
    textareaClassName: `${BASE_TEXTAREA} text-base sm:text-lg leading-relaxed mt-1 pl-2`,
    placeholder: 'Write paragraph',
  },

  paragraph1: {
    containerClassName: 'relative mb-2 group select-text',
    textareaClassName: `${BASE_TEXTAREA} text-lg sm:text-xl leading-relaxed mt-1 pl-2`,
    placeholder: 'Write paragraph1',
  },

  quotes: {
    containerClassName: 'relative mb-4 group select-text border-l-2 border-green-200 ml-8 mr-4',
    textareaClassName: `${BASE_TEXTAREA} font-semibold text-lg sm:text-xl leading-relaxed mt-1 pl-4 py-2 bg-green-50/10 `,
    placeholder: 'Write Quotes',
  }
};
