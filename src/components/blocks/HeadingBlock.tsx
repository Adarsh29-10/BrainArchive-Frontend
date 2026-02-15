import BaseBlock, { type TextBlockProps } from './BaseBlock';
import { TEXT_BLOCK_VARIANTS } from './textBlockVariants';

function HeadingBlock(props: TextBlockProps) {
  return <BaseBlock {...props} variant={TEXT_BLOCK_VARIANTS.heading} />;
}

export default HeadingBlock;

