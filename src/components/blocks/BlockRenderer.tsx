import type { Block } from "../../types/block";
import BulletBlock from "./BulletBlock";
import CodeBlock from "./CodeBlock";
import HeadingBlock from "./HeadingBlock";
import ParagraphBlock from "./ParagraphBlock";

interface BlockRendererProps {
  block: Block;
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
}

function BlockRenderer({ block, onChange, onDelete }: BlockRendererProps) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock block={block} onChange={onChange} onDelete={onDelete} />;

    case "paragraph":
      return <ParagraphBlock block={block} onChange={onChange} onDelete={onDelete}/>;

    case "bullet":
        return <BulletBlock block={block} onChange={onChange} onDelete={onDelete}/>;

    case "code":
        return <CodeBlock block={block} onChange={onChange} onDelete={onDelete}/>;

    default:
      return null;
  }
}

export default BlockRenderer;
