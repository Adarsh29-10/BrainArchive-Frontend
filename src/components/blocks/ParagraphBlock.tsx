import BaseBlock, { type TextBlockProps } from './BaseBlock';
import { TEXT_BLOCK_VARIANTS } from './textBlockVariants';

function ParagraphBlock(props: TextBlockProps) {
  return <BaseBlock {...props} variant={TEXT_BLOCK_VARIANTS.paragraph} />;
}

export default ParagraphBlock;
