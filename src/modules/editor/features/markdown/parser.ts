import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Root } from "mdast";

export function parseMarkdown(markdown: string): Root {
  return unified()
    .use(remarkParse)
    .parse(markdown);
}
