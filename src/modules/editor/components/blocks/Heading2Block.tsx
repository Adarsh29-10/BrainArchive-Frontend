import BaseBlock, { type TextBlockProps } from './BaseBlock';
import { TEXT_BLOCK_VARIANTS } from './textBlockVariants';

function Heading2Block(props: TextBlockProps) {
  return <BaseBlock {...props} variant={TEXT_BLOCK_VARIANTS.heading2} />;
}

export default Heading2Block;
