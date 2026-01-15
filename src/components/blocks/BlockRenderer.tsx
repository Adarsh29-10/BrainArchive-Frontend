import type { Block } from "../../types/block";
import BulletBlock from "./BulletBlock";
import CodeBlock from "./CodeBlock";
import Heading1Block from "./Heading1Block";
import HeadingBlock from "./HeadingBlock";
import ParagraphBlock from "./ParagraphBlock";

interface BlockRendererProps {
  block: Block;
  onChange: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
  autoFocus: string | null;
}

function BlockRenderer({ block, onChange, onDelete, autoFocus }: BlockRendererProps) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock block={block} onChange={onChange} onDelete={onDelete} autoFocus={autoFocus} />;

    case "heading1":
      return <Heading1Block block={block} onChange={onChange} onDelete={onDelete} autoFocus={autoFocus} />;

    case "paragraph":
      return <ParagraphBlock block={block} onChange={onChange} onDelete={onDelete} autoFocus={autoFocus} />;

    case "bullet":
      return <BulletBlock block={block} onChange={onChange} onDelete={onDelete} autoFocus={autoFocus} />;

    case "code":
      return <CodeBlock block={block} onChange={onChange} onDelete={onDelete} autoFocus={autoFocus} />;

    default:
      return null;
  }
}

export default BlockRenderer;
