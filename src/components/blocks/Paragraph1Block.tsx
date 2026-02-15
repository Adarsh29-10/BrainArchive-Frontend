import BaseBlock, { type TextBlockProps } from "./BaseBlock"
import { TEXT_BLOCK_VARIANTS } from "./textBlockVariants"

function Paragraph1Block(props: TextBlockProps) {
  return (
    <BaseBlock {...props} variant={TEXT_BLOCK_VARIANTS.paragraph1}/>
  )
}

export default Paragraph1Block