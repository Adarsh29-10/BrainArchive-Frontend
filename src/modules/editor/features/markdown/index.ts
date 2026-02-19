import { parseMarkdown } from "./parser";
import { mapMarkdownToBlocks } from "./mapper";

export function convertMarkdownToBlocks(markdown: string) {
  const tree = parseMarkdown(markdown);
  return mapMarkdownToBlocks(tree);
}
