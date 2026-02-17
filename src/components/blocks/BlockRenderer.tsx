import type { Block } from '../../types/block';
import BaseBlock from './BaseBlock';
import BulletBlock from './BulletBlock';
import CodeBlock from './CodeBlock';
import DividerBlock from './DividerBlock';
import { TEXT_BLOCK_VARIANTS } from './textBlockVariants';

interface BlockRendererProps {
  block: Block;
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
  autoFocus: string | null;
  setFocusedBlockId: (id: string | null) => void;
  moveBlockFocus: (currentId: string | undefined, direction: "up" | "down") => void;
  readOnly?: boolean;
}

const SPECIALIZED_BLOCKS = {
  bullet: BulletBlock,
  code: CodeBlock,
  divider: DividerBlock
};

function BlockRenderer(props: BlockRendererProps) {
  const { block } = props;

  if (block.type in TEXT_BLOCK_VARIANTS) {
    return <BaseBlock 
      {...props} 
      variant={
        TEXT_BLOCK_VARIANTS[
          block.type as keyof typeof TEXT_BLOCK_VARIANTS
        ]
      } 
    />;
  }

  const SpecializedBlock = SPECIALIZED_BLOCKS[
    block.type as keyof typeof SPECIALIZED_BLOCKS
  ];

  if (SpecializedBlock) {
    return <SpecializedBlock {...props} />;
  }

  return <BaseBlock {...props} variant={TEXT_BLOCK_VARIANTS.paragraph} />;
}

export default BlockRenderer;
